export interface Discipline {
    disciplineId: string,
    name: string,
    // timetable: [{
    //     option: string,
    //     students: string[]
    // }],
    timetable: Timetable[],
    created: string
}

interface Timetable {
    option: string,
    students: string[]
}