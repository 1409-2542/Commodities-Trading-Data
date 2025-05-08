import calendar from '../../data/calendar'
import CalendarPage from '../../components/CalendarPage'

export default function Calendar() {
  return (
    <section>
      <div>
        <CalendarPage data={calendar}/>
      </div>
      <p>Stay informed about important upcoming reports and releases that impact commodity markets.</p>
    </section>
  );
}