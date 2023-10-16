const calculatePreAssessment = (sheet, loanAmount) => {
    let tempSheet = sheet.slice(0, 12)
    if (tempSheet.length == 12) {

        let isProfit = tempSheet.every((value) => {
            return value.profitOrLoss > 0
        })
        let totalAssets = tempSheet.reduce((accumulator, value) => {
            return accumulator + value.assetsValue;
        }, 0)

        if (totalAssets > loanAmount) {
            return '100'
        }
        if (isProfit) {
            return '60'
        }

    }

    return '20'
}

export default calculatePreAssessment