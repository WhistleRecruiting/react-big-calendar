import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from '../events'
import dates from '../../src/utils/dates'

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let formats = {
  dateFormat: 'dd',
  monthHeaderFormat: 'MMMM',
}

let Basic = ({ localizer }) => (
  <BigCalendar
    formats={formats}
    events={events}
    views={allViews}
    step={60}
    // popup={false}
    showMultiDayTimes
    // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
    defaultDate={new Date()}
    onNavigate={props => console.log('navigate', props)}
    localizer={localizer}
  />
)

export default Basic
