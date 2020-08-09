const proffys = [
    { 
        name: "Kratos", 
        avatar: "https://upload.wikimedia.org/wikipedia/pt/5/53/God_of_warPS4.jpg", 
        whatsapp: "61940028922", 
        bio: "O maior deus da guerra da história. <br><br>Filho de Zeus, este deus é um matador de deuses, conhecedor dos males do mundo e da esperança. Antes vingativo e dominado pela raiva. Agora Kratos quer apenas ser um bom pai e entrou para o ramo da educação.", 
        subject: "História", 
        cost: "100", 
        weekday: [0], 
        time_from: [720], 
        time_to: [1220]
    },
    { 
        name: "Darth Vader", 
        avatar: "https://i.pinimg.com/originals/70/ab/d1/70abd13b4b4515946b3db8fca42981b1.jpg", 
        whatsapp: "61969696969", 
        bio: "O escolhido... <br><br>Antes um jedi extremamente habilidoso, Darh Vader agora sith, é um dos sith mais poderosos que já existiu em toda a galáxia. Temido, odiado e amado, com ele você aprenderá os caminhos para o lado sombrio da força e conseguirá dobrar qualquer lei da física que você tenha estudado.", 
        subject: "Física", 
        cost: "100", 
        weekday: [1], 
        time_from: [720], 
        time_to: [1220]
    }
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query

    const isNotEmpty = Object.keys(data).length != 0 // transformando o objeto em array

    if (isNotEmpty) {
        
        data.subject = getSubject(data.subject)
        proffys.push(data)

        return res.redirect("/study")
    }
    return res.render("give-classes.html", { subjects, weekdays })
}

const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server
.use(express.static("public"))
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.listen(5500)