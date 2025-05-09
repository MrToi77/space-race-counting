// DataModel.ts
class instanceDeclare {
    levelIndex: number = 1;
    redShipDuration: number = 120000;
    constructor() {
       
    }
}

// Tạo instance duy nhất và export nó
const Instance = new instanceDeclare();
export default Instance;
