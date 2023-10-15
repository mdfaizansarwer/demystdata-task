import _ from 'lodash'

const generateYearlySummary = (sheet) => {

    var grouped = _.groupBy(sheet, 'year');
    let yearlySummary = Object.keys(grouped).map((group) => {
        return {
            year: group,
            profitOrLoss: grouped[group].reduce((accumulator, value) => {
                return accumulator + value.profitOrLoss;
            }, 0)
        }
    })
    return yearlySummary
}

export default generateYearlySummary