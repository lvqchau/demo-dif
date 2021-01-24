import React, { useState } from 'react'
import ButtonFilled from '../../components/ButtonFilled'

export default function HomePage() {
  const [state, setState] = useState({
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
    six: '',
    seven: '',
    eight: '',
    nine: ''
  })

  const [res, setRes] = useState(0)
  
  const handleChange = (e) => {
    const {name, value} = e.target
    setState({
      ...state,
      [name]: value
    })
  }

  const cal = () => {
    let {one,two,three,four,five,six,seven,eight,nine} = state
    one = parseFloat(one)
    two = parseFloat(two)
    three = parseFloat(three)
    four = parseFloat(four)
    five = parseFloat(five)
    six = parseFloat(six)
    seven = parseFloat(seven)
    eight = parseFloat(eight)
    nine = parseFloat(nine)

    setRes((0.25*one)+(0.5*two)+(0.25*three)+(0.5*four)+(1.0*five)+(0.5*six)+(0.25*seven)+(0.5*eight)+(0.25*nine))
  }

  return (
    <div>
      <div>
        <label htmlFor="one">[0,0]</label>
        <input type="text" name="one" id="one" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="two">[0,1]</label>
        <input type="text" name="two" id="two" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="three">[0,2]</label>
        <input type="text" name="three" id="three" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="four">[1,0]</label>
        <input type="text" name="four" id="four" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="five">[1,1]</label>
        <input type="text" name="five" id="five" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="six">[1,2]</label>
        <input type="text" name="six" id="six" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="seven">[2,0]</label>
        <input type="text" name="seven" id="seven" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="eight">[2,1]</label>
        <input type="text" name="eight" id="eight" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="nine">[2,2]</label>
        <input type="text" name="nine" id="nine" onChange={handleChange}/>
      </div>
      <ButtonFilled onClick={cal}>Calculate</ButtonFilled>
      <br/>
      <h2>Result: {res} </h2>
    </div>
  )
}
