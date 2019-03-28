import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import cn from 'classnames'
import dates from './utils/dates'

let propTypes = {
  event: PropTypes.object.isRequired,
  slotStart: PropTypes.instanceOf(Date),
  slotEnd: PropTypes.instanceOf(Date),

  selected: PropTypes.bool,
  isAllDay: PropTypes.bool,
  continuesPrior: PropTypes.bool,
  continuesAfter: PropTypes.bool,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object,

  onSelect: PropTypes.func,
  onDoubleClick: PropTypes.func,
}

class EventCell extends React.Component {
  render() {
    let {
      style,
      className,
      event,
      selected,
      isAllDay,
      onSelect,
      onDoubleClick,
      localizer,
      continuesPrior,
      continuesAfter,
      accessors,
      getters,
      children,
      components: { event: Event, eventWrapper: EventWrapper },
      ...props
    } = this.props

    let title = accessors.title(event)
    let tooltip = accessors.tooltip(event)
    let end = accessors.end(event)
    let start = accessors.start(event)
    let allDay = accessors.allDay(event)

    let showAsAllDay =
      isAllDay || allDay || dates.diff(start, dates.ceil(end, 'day'), 'day') > 1

    let userProps = getters.eventProp(event, start, end, selected)

    const content = (
      <div className="rbc-event-content" title={tooltip || undefined}>
        {/* adjust line-heights and font-sizes, get <img/> in there*/}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={event.image}
            style={{
              width: 25,
              height: 25,
              borderRadius: '50%',
              marginRight: 5,
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                lineHeight: '12px',
                fontSize: '12px',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {event.title}
            </div>
            <div style={{ lineHeight: '10px', fontSize: '10px' }}>{`${moment(
              event.start
            ).format('h:mm a')}`}</div>
          </div>
        </div>
        {/* {Event && (
          <Event
            event={event}
            title={title}
            isAllDay={allDay}
            localizer={localizer}
          />
        )} */}
      </div>
    )

    return (
      <EventWrapper {...this.props} type="date">
        <div
          {...props}
          style={{
            ...userProps.style,
            ...style,
            padding: '2px 3px',
            borderRadius: '5px',
            margin: '2px 0',
          }}
          className={cn('rbc-event', className, userProps.className, {
            'rbc-selected': selected,
            'rbc-event-allday': showAsAllDay,
            'rbc-event-continues-prior': continuesPrior,
            'rbc-event-continues-after': continuesAfter,
          })}
          // onClick={e => onSelect && onSelect(event, e)}
          // onDoubleClick={e => onDoubleClick && onDoubleClick(event, e)}
        >
          {typeof children === 'function' ? children(content) : content}
        </div>
      </EventWrapper>
    )
  }
}

EventCell.propTypes = propTypes

export default EventCell
