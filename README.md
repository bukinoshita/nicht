# nicht
> Command line interface prompt bool values

## Install
```bash
$ npm install nicht
```

## Usage
```javascript
import nicht from 'nicht'

nitch('Are you okay?')
// => Are you okay? [y|N]
```

## Demo

<img src="https://cldup.com/h0RkelnjlQ.gif"/>

## API

### nicht(question, { defaultValue, yesChar, noChar })

#### question

Type: `string`<br/>
Required

#### defaultValue

Type: `bool`<br/>
default: `false`

If user doesn't choose [y|N], it will return `false` as default.

#### yesChar

Type: `string`<br/>
default: `y`

#### noChar

Type: `string`<br/>
default: `n`

## License

[MIT](https://raw.githubusercontent.com/bukinoshita/nicht/master/LICENSE) &copy; Bu Kinoshita
