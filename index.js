function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(allEmpData) {
    return allEmpData.map(createEmployeeRecord)
}

function createTimeInEvent(timestamp) {
    let [date, hour] = timestamp.split(" ")

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

function createTimeOutEvent(timestamp) {
    let [date, hour] = timestamp.split(" ")

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

function hoursWorkedOnDate(date) {
    let workDayIn = this.timeInEvents.find(timeInEvent => timeInEvent.date === date)
    let workDayOut = this.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date)

    let hourIn = workDayIn.hour
    let hourOut = workDayOut.hour

    let hoursWorked = (hourOut - hourIn)/100
    return hoursWorked
}

function wagesEarnedOnDate(date) {
    let timeWorked =  hoursWorkedOnDate.call(this, date)
    let wage = this.payPerHour

    return timeWorked * wage
}

function allWagesFor() {
    let datesWorked = this.timeInEvents.map(timeInEvent => timeInEvent.date)

    let paycheck = datesWorked.reduce(((tally, date) => tally + wagesEarnedOnDate.call(this, date)).bind(this), 0)
    return paycheck
}

function findEmployeeByFirstName(employeeArray, employeeName) {
    return employeeArray.find(employeeInfo => employeeInfo.firstName)
}
function calculatePayroll(employeesArray) {
    return employeesArray.reduce((payrollTally, employee) => payrollTally + allWagesFor.call(employee), 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }