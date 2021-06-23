const WDIOReporter = require('@wdio/reporter')

class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * make reporter to write to the output stream by default
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }


    // onRunnerStart() {}
    // onBeforeCommand() {}
    // onAfterCommand() {}
    // onSuiteStart() {}
    // onHookStart() {}
    // onHookEnd() {}
    // onTestStart() {}
    // onTestPass() {}
    // onTestFail() {}
    // onTestSkip() {}
    // onTestEnd() {}
    // onSuiteEnd() {}
    // onRunnerEnd() {}
}

module.exports = CustomReporter;