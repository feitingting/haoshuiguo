import Taro, { Component } from '@tarojs/taro'
import { View, Input } from '@tarojs/components'
import cls from 'classnames'
import './index.less'

export default class Stepper extends Component {
  static defaultProps = {
    min: 1,
    max: Infinity,
    defaultValue: 1,
    step: 1,
    disabled: false,
  }

  constructor() {
    super(...arguments)
    this.state = {
      currentValue: this.props.defaultValue || 1,
    }
  }

  onChange = (event) => {
    this.setCurrentValue(event.target.value)
  }

  setCurrentValue = (value) => {
    this.setState({
      currentValue: value,
    })
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(value)
    }
  }

  changeValue = (type) => {
    if ((this.minusDisabled() && type === 'minus') || (this.plusDisabled() && type === 'plus')) {
      return
    }
    const step = +this.props.step
    const currentValue = +this.state.currentValue
    this.setCurrentValue(type === 'minus' ? (currentValue - step) : (currentValue + step))
  }

  minusDisabled = () => {
    const min = +this.props.min
    const step = +this.props.step
    const currentValue = +this.state.currentValue
    return min === currentValue || (currentValue - step) < min || this.props.disabled
  }

  plusDisabled = () => {
    const max = +this.props.max
    const step = +this.props.step
    const currentValue = +this.state.currentValue
    return max === currentValue || (currentValue + step) > max || this.props.disabled
  }

  render() {
    return (
      <View className='stepper'>
        <View className={cls('minus', {disabled: this.minusDisabled()})}
          onClick={this.changeValue.bind(this, 'minus')}
        />
        <View className='input_wrapper'>
          <Input
            type='number'
            className='input'
            value={this.state.currentValue}
            onChange={this.onChange}
          />
        </View>
        <View className={cls('plus', {disabled: this.plusDisabled()})} onClick={this.changeValue.bind(this, 'plus')} />
      </View>
    )
  }
}
