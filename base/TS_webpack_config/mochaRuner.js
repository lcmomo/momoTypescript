const Mocha = require("mocha");

const mocha = new Mocha({
    reporter: "mochawesome",
    reporterOptions: {
        reportDir: "./docs/mochawesome",
        // reportFilename: "customReportFilename",
        // quiet: true
    }
})

mocha.addFile("./tests/server/router.spec.js")

mocha.run(() => {
    process.exit()
})