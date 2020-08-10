const Database = require('./db.js')
const createProffy = require('./createProffy.js')

Database.then(async (db) => {
    proffyValue = {
        name: "Kratos", 
        avatar: "https://upload.wikimedia.org/wikipedia/pt/5/53/God_of_warPS4.jpg", 
        whatsapp: "61940028922", 
        bio: "O maior deus da guerra da história. <br><br>Filho de Zeus, este deus é um matador de deuses, conhecedor dos males do mundo e da esperança. Antes vingativo e dominado pela raiva. Agora Kratos quer apenas ser um bom pai e entrou para o ramo da educação."
    }

    classValue = {
        subject: 6, 
        cost: "100"
    }

    classScheduleValues = [
        {
            weekday: 1, 
            time_from: 720, 
            time_to: 1220
        },

        {
            weekday: 0, 
            time_from: 520, 
            time_to: 1220
        }
    ]

    // await createProffy(db, { proffyValue, classValue, classScheduleValues })

    const selectProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectProffys)

    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "720"
        AND class_schedule.time_to < "1300"
    `)

    // console.log(selectClassesSchedules)
})