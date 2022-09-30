let object = new Object(),
    blocks = [],
    bloc = new Object();
object['id'] = 'FrozerStuf'
object['name'] = 'Frozers cool stuffs'
object['menus'] = {};
//object['menuIconURI'] = 'http://127.0.0.1:8887/download.png';
object['color1'] = '#7289da';

function reset(arg = false, args = []) {
    bloc = new Object();
    if (arg == true) {
        bloc['arguments'] = {}
        args.forEach((ar) => {
            bloc['arguments'][ar] = {}
        })
    }
}
async function reques(url, options) {
    var a;
    try {
        a = await fetch(url, options).then(r => r.json());
        a = JSON.stringify(a)
    } catch {
        a = await fetch(url, options).then(r => r.text()).catch(() => '');
    }
    return a
}
//Menus
object['menus']['requestTypes'] = {}
object['menus']['requestTypes']['items'] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
//request
reset(true, ['type', 'URL', 'header', 'body'])
bloc['opcode'] = 'request'
bloc['blockType'] = Scratch.BlockType.REPORTER
bloc['text'] = '[type] from [URL] with headers [header] and body [body]'
bloc['arguments']['type']['type'] = Scratch.ArgumentType.NUMBER
bloc['arguments']['type']['menu'] = 'requestTypes'
bloc['arguments']['URL']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['URL']['defaultValue'] = 'https://extensions.turbowarp.org/hello.txt'
bloc['arguments']['header']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['header']['defaultValue'] = '{}'
bloc['arguments']['body']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['body']['defaultValue'] = '{}'
blocks.push(bloc)
//list length
reset(true, ['list'])
bloc['opcode'] = 'listLength'
bloc['blockType'] = Scratch.BlockType.REPORTER
bloc['text'] = 'Length of list [list]'
bloc['arguments']['list']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['list']['defaultValue'] = '["list here"]'
blocks.push(bloc)
//create new object
reset()
bloc['opcode'] = 'createObj'
bloc['blockType'] = Scratch.BlockType.REPORTER
bloc['text'] = 'Create new object'
bloc['disableMonitor'] = true
blocks.push(bloc)
//get from object
reset(true, ['item', 'object'])
bloc['opcode'] = 'get'
bloc['blockType'] = Scratch.BlockType.REPORTER
bloc['text'] = 'get item [item] from object [object]'
bloc['arguments']['item']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['item']['defaultValue'] = 'item'
bloc['arguments']['object']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['object']['defaultValue'] = '{"item": "put json here"}'
blocks.push(bloc)
//set in object
reset(true, ['item', 'value', 'object'])
bloc['opcode'] = 'set'
bloc['blockType'] = Scratch.BlockType.REPORTER
bloc['text'] = 'set item [item] to [value] in object [object]'
bloc['arguments']['item']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['item']['defaultValue'] = 'item'
bloc['arguments']['value']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['value']['defaultValue'] = 'value'
bloc['arguments']['object']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['object']['defaultValue'] = '{"item": "put json here"}'
blocks.push(bloc)
//delete from object
reset(true, ['item', 'object'])
bloc['opcode'] = 'delete'
bloc['blockType'] = Scratch.BlockType.REPORTER
bloc['text'] = 'delete item [item] from object [object]'
bloc['arguments']['item']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['item']['defaultValue'] = 'item'
bloc['arguments']['object']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['object']['defaultValue'] = '{"item": "put json here"}'
blocks.push(bloc)
//object has
reset(true, ['object', 'item'])
bloc['opcode'] = 'has'
bloc['blockType'] = Scratch.BlockType.BOOLEAN
bloc['text'] = 'object [object] has [item]'
bloc['arguments']['item']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['item']['defaultValue'] = 'item'
bloc['arguments']['object']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['object']['defaultValue'] = '{"item": "put json here"}'
blocks.push(bloc)
//console clear
reset()
bloc['opcode'] = 'consoleClear'
bloc['blockType'] = Scratch.BlockType.COMMAND
bloc['text'] = 'Clear console'
blocks.push(bloc)
//console log
reset(true, ['item'])
bloc['opcode'] = 'consoleLog'
bloc['blockType'] = Scratch.BlockType.COMMAND
bloc['text'] = 'Log in console [item]'
bloc['arguments']['item']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['item']['defaultValue'] = 'hi'
blocks.push(bloc)
//console info
reset(true, ['item', 'data'])
bloc['opcode'] = 'consoleInfo'
bloc['blockType'] = Scratch.BlockType.COMMAND
bloc['text'] = 'Log in console [item] styling [data]'
bloc['arguments']['item']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['item']['defaultValue'] = 'hi'
bloc['arguments']['data']['type'] = Scratch.ArgumentType.STRING
bloc['arguments']['data']['defaultValue'] = 'color: cyan;'
blocks.push(bloc)
//Add blocks
object['blocks'] = blocks;
class FrostsStuffs {
    getInfo() {
        return object
    }
    request(args) {
        let url = args.URL,
            method = args.type,
            headers = args.header,
            body = args.body,
            options = new Object();
        options['method'] = method
        if (body == null || !body.length || body == '{}') {} else {
            options['body'] = body;
        }
        if (headers == null || !headers.length || headers == '{}') {} else {
            options['headers'] = headers;
        }
        let a = reques(url, options)
        return a
    }
    createObj() {
        return JSON.stringify(new Object());
    }
    get(args) {
        let object = JSON.parse(args.object)
        let item = object[args.item]
        if (typeof item === 'object' && item !== null) {
            return JSON.stringify(item)
        } else {
            return item
        }
    }
    set(args) {
        let object = JSON.parse(args.object)
        if (typeof object === 'object' && object !== null) {
            object[args.item] = args.value
            return JSON.stringify(object)
        } else {
            object = new Object();
            object[args.item] = args.value;
            return object
        }
    }
    delete(args) {
        let object = JSON.parse(args.object)
        if (typeof object === 'object' && object !== null) {
            delete object[args.item]
            return JSON.stringify(object)
        } else {
            object = new Object();
            return object
        }
    }
    has(args) {
        var data;
        try {
            data = JSON.parse(args.object);
        } catch (err) {
            console.log(`%cObject is formatted incorrectly`, `color:red;`)
            console.log(err)
            return false;
        }
        if (data[args.item] == undefined) return false;
        return true;
    }
    listLength(args) {
        return JSON.parse(args.list).length
    }
    consoleLog(args) {
        console.log(args.item)
    }
    consoleInfo(args) {
        console.info(`%c${args.item}`, args.data)
    }
    consoleClear(args) {
        console.clear()
    }
}
Scratch.extensions.register(new FrostsStuffs());
