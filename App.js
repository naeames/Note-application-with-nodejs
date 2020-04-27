const action = process.argv[2]
const item1 = process.argv[4] //title
const item2 = process.argv[6] //body


const fs = require('fs')
display = () => {
    fs.readFile("note.json", function (err, data) {
        var json = JSON.parse(data)
        console.log('Printing:', json.length, 'note(s).\n--\n')
        for (let i = 0; i < json.length; i++) {
            console.log("Title:", json[i].title, "\nBody:", json[i].body + '\n--\n')
        }
    })
}

add = () => {
    fs.readFile("note.json", function (err, data) {
        var json = JSON.parse(data)
        if (process.argv.length === 7) {
            json.push({ "title": item1, "body": item2 })
            fs.writeFile("note.json", JSON.stringify(json), function (err) {
                if (err) throw err
                console.log('Note created\n--\nTitle:', item1, '\nBody:', item2);
            })
        }
        else if (process.argv.length === 4) {
            console.log("Missing required argument: title\n")
        }
        else if (process.argv.length === 6) {
            console.log("Missing required argument: body\n")
        }

        else {
            console.log("\nOptions:\n --help Show help [boolean] \n --title, -t Title of note [required] \n --body, -b  Body of note [required] \n\nMissing required arguments: title, body\n ")
        }
    })
}

remove = () => {
    if (process.argv.length === 5) {
        fs.readFile("note.json", function (err, data) {
            var json = JSON.parse(data)
            const index = json.findIndex(x => x.title === item1)
            if (index !== undefined) json.splice(index, 1)
            console.log("Note was removed\n")
            fs.writeFile("note.json", JSON.stringify(json), function (err) {
                if (err) throw err
            })
        })
    }
    else {
        console.log("\nOptions:\n --help Show help [boolean] \n --title, -t Title of note [required] \n --body, -b  Body of note [required] \n\nMissing required arguments: title, body\n ")
    }
}

readdata = () => {
    fs.readFile('note.json', function (err, data) {
        let found = false;
        let index = 0;
        var json = JSON.parse(data);
        while (index < json.length) {
            if (json[index].title === item1) {
                found = true;
                console.log("Note found");
                console.log('Title:', json[index].title, '\nBody:', json[index].body + "\n--\n");
                break
            }
            else
                index++
        }
        if (found === false) {
            console.log("item not found")
        }
    })
}


switch (action) {
    case "list":
        display();
        break;
    case "add":
        add();
        break;
    case "remove":
        remove();
        break;
    case "read":
        readdata()
        break;
    default:
        console.log("\nOptions:\n --help Show help [boolean] \n --title, -t Title of note [required] \n --body, -b  Body of note [required] \n\nMissing required arguments: title, body\n ")

}