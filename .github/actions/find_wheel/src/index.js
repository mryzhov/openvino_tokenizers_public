const core = require("@actions/core");
const glob = require("glob");
const path = require("path");
const { promisify } = require("util");
const { exec } = require("child_process");

const execAsync = promisify(exec);

async function getPythonVersion() {
  const { stdout } = await execAsync("python --version");
  const versionMatch = stdout.match(/Python (\d+)\.(\d+)\.(\d+)/);
  if (versionMatch) {
    return {
      major: versionMatch[1],
      minor: versionMatch[2],
      patch: versionMatch[3],
    };
  } else {
    throw new Error("Unable to detect Python version");
  }
}

async function run() {
  try {
    const wheelsDir = path.normalize(
      core.getInput("wheels_dir", { required: true }),
    );
    const packageName = core.getInput("package_name", { required: true });
    const pattern = `${packageName}*.whl`;

    const pythonVersion = await getPythonVersion();
    core.debug(`Detected Python version: ${JSON.stringify(pythonVersion)}`);

    const wheelsFound = [];
    if (wheelsDir) {
      const wheels = glob.sync(path.posix.join(wheelsDir, pattern));
      core.debug(`Found wheels: ${wheels}`);

      for (const whl of wheels) {
        const wheelPythonVersion = path.basename(whl).match(/cp(\d{2,3})/);
        if (
          !wheelPythonVersion ||
          wheelPythonVersion[1] ===
            `${pythonVersion.major}${pythonVersion.minor}`
        ) {
          wheelsFound.push(whl);
        }
      }
    }
    core.debug(`Resolved local wheels: ${JSON.stringify(wheelsFound)}`);

    if (wheelsFound.length === 0) {
      core.setFailed(`No files found matching pattern "${pattern}"`);
      return;
    } else if (wheelsFound.length > 1) {
      core.setFailed(
        `Multiple files found matching pattern "${pattern}": ${JSON.stringify(wheelsFound)}`,
      );
      return;
    } else {
      core.info(`Found "${wheelsFound[0]}"`);
    }

    core.setOutput("wheel_path", wheelsFound[0]);
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = {
  run,
  getPythonVersion,
};

run();
