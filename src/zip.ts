import { join } from "https://deno.land/std@0.92.0/path/mod.ts";
import { exists } from "https://deno.land/std@0.92.0/fs/mod.ts";

// Great code modified from: https://deno.land/x/zip@v1.1.1
// Modified because of an os.tmpDir error, version differences,
// and overwriting limitations in Deno.run unzip command

export async function unZipFromFile(
    filePath: string,
    destinationPath: string | null = "./",
    options: any = {},
  ): Promise<string | false> {
    if (!await exists(filePath)) {
      console.error("this file does not found");
      return false;
    }

    if (!destinationPath) {
      destinationPath = "./";
    }

    const fullFileName = filePath.split("/");
    const fileNameWithOutExt =
      fullFileName[fullFileName.length - 1].split(".")[0];
    const fullDestinationPath = options.includeFileName
      ? join(destinationPath, fileNameWithOutExt)
      : destinationPath;
  
    return await unzipProcess(filePath, fullDestinationPath)
      ? fullDestinationPath
      : false;
  }

async function unzipProcess(
    zipSourcePath: string,
    destinationPath: string,
    ): Promise<boolean> {
    
    const process = Deno.run({
        cmd: ["unzip", "-o", zipSourcePath, "-d", destinationPath],
        stdout: "piped",
        stderr: "piped",
    });

    const { success, code } = await process.status();

    // Reading the outputs closes their pipes
    const rawOutput = await process.output();
    const rawError = await process.stderrOutput();

    if (!success) {
        const str = new TextDecoder().decode(rawError);
        throw new Error(`$Command failed: code ${code}, message: ${str}`);
    } else {
        const str = new TextDecoder().decode(rawOutput);
        console.log(str);
    }

    Deno.close(process.rid) // close the process

    return success
}

function getDirectory() {
	if (Deno.build.os === "windows") {
		return Deno.env.get("TMP") || Deno.env.get("TEMP") || Deno.env.get("USERPROFILE") || Deno.env.get("SystemRoot") || ""
	}

	return Deno.env.get("TMPDIR") || "/tmp"
}

export async function downloadFileToTemp(url: string): Promise<string> {
    const response = await fetch(url)
    const blob = await response.blob()

    const arrayBufferFromBlobResponse = await blob.arrayBuffer()
    const uint8ArrayEncodeFileData = new Uint8Array(arrayBufferFromBlobResponse)
  
    const temporaryDirectory = Deno.realPathSync(getDirectory())

    const tempFilePath = join(temporaryDirectory, "file.zip")

    const file = await Deno.create(tempFilePath)
    await Deno.writeAll(file, uint8ArrayEncodeFileData)
  
    Deno.close(file.rid)
  
    return tempFilePath
}

export async function unZipFromURL(
    fileURL: string,
    destinationPath: string | null = "./",
    options: any = {},
  ): Promise<string | false>{
    const downloadedFilePath = await downloadFileToTemp(fileURL)
  
    const unZippingProcess = await unZipFromFile(
      downloadedFilePath,
      destinationPath,
      options,
    )
  
    await Deno.remove(downloadedFilePath)
  
    return unZippingProcess
}