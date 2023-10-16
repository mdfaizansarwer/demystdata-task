import calculatePreAssessment from './calculate-pre-assessment.js'
import generateYearlySummary from './generate-yearly-summary.js'

const generateFinalData = (name, year, sheet, loanAmount) => {
    return {
        name,
        year,
        summary: generateYearlySummary(sheet),
        preAssessment: calculatePreAssessment(sheet, loanAmount)

    }
}

export default generateFinalData