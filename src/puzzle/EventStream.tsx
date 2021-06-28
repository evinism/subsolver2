interface EventStreamProps {
  events: string[];
}

const EventStream = ({ events }: EventStreamProps) => {
  return (
    <div className="event-stream">
      <div className="event-stream-header">Recent Events</div>
      <div className="event-stream-items">
        {events.slice(0, 5).map((str) => (
          <div>{str}</div>
        ))}
      </div>
    </div>
  );
};

export default EventStream;
