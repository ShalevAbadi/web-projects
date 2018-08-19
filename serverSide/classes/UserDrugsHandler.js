
module.exports = class UserDrugsHandler {

    constructor(db) {
        this.db = db;
    }

    createUserDrug(userDrug) {
        return this.createUserDrugDB(userDrug.getUser().getId(), userDrug.getDrug().getId(), userDrug.getExp()).then(console.log.bind(console));
    }

    createUserDrugDB(userId, drugId, expDate) {
        let sql = "INSERT INTO userdrugs (DrugId, UserId, ExpirationDate) VALUES (" + drugId + "," + userId + ",'" + expDate + "')";
        return this.db.runSQL(sql);
    }

    setUserDrugOpened(userDrugId) {
        return this.setUserDrugOpenedDB(userDrugId, this.getDateFormated()).then(console.log.bind(console));
    }

    setUserDrugOpenedDB(userDrugId, date) {
        let sql = "UPDATE userdrugs SET DateOpened = '" + date + "' WHERE userdrugs.UserDrugId = " + userDrugId;
        return this.db.runSQL(sql);
    }

    getDateFormated() {
        let datetime = new Date();
        let year = datetime.getFullYear();
        let month = this.format2Digits(datetime.getMonth());
        let day = this.format2Digits(datetime.getDate());
        return (year + "-" + month + "-" + day);
    }

    format2Digits(check) {
        return (check < 10 ? "0" + check : check);
    }

    getUserDrugs(userId) {
        let sql = "SELECT * FROM userdrugs WHERE UserId='" + userId + "'";
        return this.db.runSQL(sql);

    }

    deleteUserDrug(userDrugId) {
        let sql = "DELETE FROM userdrugs WHERE userdrugs.UserDrugId = " + userDrugId;
        return this.db.runSQL(sql);
    }

};