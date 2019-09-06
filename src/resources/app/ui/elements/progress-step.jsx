import React from 'react'
import styled, { css } from 'styled-components'


const ElementLast = styled.li`
  :after {
    display: none !important;
  }
`

const Progress = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: table;
  table-layout: fixed;
  width: 100%;
  color: #849397;

  li {
    position: relative;
    display: table-cell;
    text-align: center;
    font-size: 0.8em;

    :before {
      content: attr(data-step);
      display: block;
      margin: 0 auto;
      background: #DFE3E4;
      width: 3em;
      height: 3em;
      text-align: center;
      margin-bottom: 0.25em;
      line-height: 3em;
      border-radius: 100%;
      position: relative;
      z-index: 1000;
    }

    :after {
      content: '';
      position: absolute;
      display: block;
      background: #DFE3E4;
      width: 100%;
      height: 0.5em;
      top: 1.25em;
      left: 50%;
      margin-left: 1.5em\9;
      z-index: -1;
    }

    :last-child:after {
      display: none;
    }

    .is-complete {
      color: #2ECC71;
    }

    ${
      ({ completed }) => completed ? css`
        :before , :after{
          color: #FFF;
          background: #2ECC71;
        }
      ` : ''
    }

    .is-complete:before, .progress > li.is-complete:after {
      color: #FFF;
      background: #2ECC71;
    }

    .is-active {
      color: #3498DB;
    }

    .is-active:before {
      color: #FFF;
      background: #3498DB;
    }
  }

  *, *:after, *:before {
    box-sizing: border-box;
  }
`
const ProgressStepComponent = () => {
  return (
    <Progress>
      <li completed={ "true" } data-step="1">
        Step 1
      </li>
      <li data-step="2">
        Step 2
      </li>
      <ElementLast data-step="3">
        Step 3
      </ElementLast>
    </Progress>
  )
}

export default ProgressStepComponent
