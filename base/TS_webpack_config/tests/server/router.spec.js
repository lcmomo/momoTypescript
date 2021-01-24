const axios = require("axios");


describe("基础service接口测试", () => {

    it("getHello路由测试", (done) => {
        axios.get("http://localhost:3000/api/getHello")
        .then(function (response) {
            const result = response.data.data;
            if (result == "Hello World!") {
                done();
            } else {
                done(new Error("接口错误"))
            }
        })
        .catch(function (error) {
            console.log(error);
            done(new Error("接口错误"))
        });
        // .finally(function () {
        //     done(new Error("接口错误"))
        // })
    })
})


// axios.get("http://localhost:3000/api/getHello")
//         .then(function (response) {
//             const result = response.data.data;
//             console.log(response.data.data);
//         })