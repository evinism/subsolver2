interface EventStreamProps {
  events: string[];
}

const EventStream = ({ events }: EventStreamProps) => {
  return (
    <div className="event-stream">
      <div className="event-stream-items">
        {events.slice(0, 25).map((str) => (
          <div>{str}</div>
        ))}
      </div>
    </div>
  );
};

export default EventStream;
