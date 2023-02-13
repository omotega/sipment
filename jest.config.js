/**@types {import ('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset:"ts-jest",
    testEnviroment:"node",
    testMatch:['**/**/*.test.ts'],
    verbose:true,
    forceExit:true,
    // clearMocks:true,

}