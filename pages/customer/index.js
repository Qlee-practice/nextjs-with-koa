import './index.scss';
import * as React from "react";
import Layout from './layout';
import { Link } from "../../routes-page";

const changePosition = (arr, prev, next) => {
  const newArr = [...arr];
  const tmp = newArr[prev];
  newArr[prev] = newArr[next];
  newArr[next] = tmp;
  return newArr;
};

export default class CustomerIndex extends React.PureComponent {

  state = {
    options: [{
      text: '张三',
      value: 'zhangSan'
    }, {
      text: '李四',
      value: 'liSi'
    }, {
      text: '王五',
      value: 'wangWu'
    }, {
      text: '孙六',
      value: 'sunLiu'
    }],
    options2: [],
    options3: [],
    draggedOption: null,
    draggedSection: null,
  };

  drop = (event, sectionName) => {
    event.preventDefault();
    const value = event.dataTransfer.getData("value");
    const originSection = event.dataTransfer.getData("section");
    this.move(value, originSection, sectionName, this.state[sectionName].length);
  };

  move(value, fromSectionName, toSectionName, optionIndex) {
    if (this.state[toSectionName].some(op => op.value === value)) {
      return;
    }
    this.setState(state => {
      const option = state[fromSectionName].find(op => op.value === value);
      const index = state[fromSectionName].findIndex(op => op === option);
      state[fromSectionName].splice(index, 1);
      state[toSectionName].splice(optionIndex, 0, option);
      return {
        [fromSectionName]: state[fromSectionName],
      };
    });
  }

  dragStart = (option, sectionName) => {
    event.dataTransfer.setData("section", sectionName);
    event.dataTransfer.setData("value", option.value);
    this.setState({ draggedOption: option, draggedSection: sectionName });
  };

  dragover = event => event.preventDefault();

  dragEnter = (currentOption, sectionName) => {
    if (this.state.draggedOption.value === currentOption.value) {
      return;
    }
    const options = this.state[sectionName];
    const value = this.state.draggedOption.value;
    const draggedOptionIndex = options.findIndex(op => op.value === value);
    const currentIndex = options.findIndex(op => op === currentOption);

    if (draggedOptionIndex === -1) {
      this.move(value, this.state.draggedSection, sectionName, currentIndex);
      return;
    }
    this.setState({ [sectionName]: changePosition(options, draggedOptionIndex, currentIndex) });
  };

  render() {
    const { options, options2, options3 } = this.state;
    return (<Layout>
      <Link route="/customer/666/detail">
        <a>Customer Detail</a>
      </Link>
      { this.props.children }
      <div className='container'>
        <ul onDrop={ e => this.drop(e, 'options') } onDragOver={ this.dragover }>
          { options.map(op =>
            <li key={ op.value }
                draggable
                onDragStart={ () => this.dragStart(op, 'options') }
                onDragEnter={ () => this.dragEnter(op, 'options') }
                value={ op.value }>{ op.text }</li>) }
        </ul>
        <ul onDrop={ e => this.drop(e, 'options2') } onDragOver={ this.dragover }>
          { options2.map(op =>
            <li draggable
                key={ op.value }
                onDragStart={ () => this.dragStart(op, 'options2') }
                onDragEnter={ () => this.dragEnter(op, 'options2') }
                value={ op.value }>{ op.text }</li>) }
        </ul>
        <ul onDrop={ e => this.drop(e, 'options3') } onDragOver={ this.dragover }>
          { options3.map(op =>
            <li draggable
                onDragStart={ () => this.dragStart(op, 'options3') }
                onDragEnter={ () => this.dragEnter(op, 'options3') }
                key={ op.value }
                value={ op.value }>{ op.text }</li>) }
        </ul>
      </div>
    </Layout>)
  }
}
