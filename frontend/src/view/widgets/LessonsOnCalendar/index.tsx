import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FullCalendar, {
  EventContentArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';

import Card from '@mui/material/Card';

import $ from 'jquery';

import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

import CalendarRoot from 'src/mui/shared/Calendar/CalendarRoot';

import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import actions from 'src/modules/widget/lessonsOnCalendar/lessonsOnCalendarActions';
import LessonViewModal from 'src/view/widgets/LessonsOnCalendar/LessonViewModal';
import RecurringLessonModal from 'src/view/widgets/LessonsOnCalendar/RecurringLessonModal';
import lessonSelectors from 'src/modules/lesson/lessonSelectors';
import lessonsOnCalendarSelectors from 'src/modules/widget/lessonsOnCalendar/lessonsOnCalendarSelectors';
import LessonFormModal from 'src/view/widgets/LessonsOnCalendar/LessonFormModal';
import Message from 'src/view/shared/message';
import Spinner from 'src/view/shared/Spinner';

interface LessonsOnCalendarProps {
  title?: string;
  date?: string;
}

function LessonsOnCalendar({
  title,
  date,
}: LessonsOnCalendarProps): JSX.Element {
  const dispatch = useDispatch();

  const { miniSidenav, darkMode } = selectMuiSettings();

  const editable = useSelector(
    lessonSelectors.selectPermissionToEdit,
  );

  const isLoading = useSelector(
    lessonsOnCalendarSelectors.selectLoading,
  );

  const calendarRef: any = React.useRef();

  useEffect(() => {
    setTimeout(() => {
      calendarRef.current.getApi().updateSize();
    }, 500);
  }, [dispatch, miniSidenav]);

  const handleDateClick = (dateInfo) => {
    if ($(dateInfo.dayEl).hasClass('fc-day-past')) {
      return;
    }
    if (editable) {
      if (
        $('.fc-event:not(.event-success)', dateInfo.dayEl)
          .length === 0
      ) {
        doOpenLessonFormModal(null, dateInfo.date);
      } else {
        doOpenRecurringLessonModal(dateInfo.date);
      }
      calendarRef.current.getApi().select(dateInfo.date);
    }
  };

  const handleEvents = (
    info,
    successCallback,
    failureCallback,
  ) => {
    dispatch(
      actions.doSearch(
        info,
        successCallback,
        failureCallback,
      ),
    );
  };

  const handleEventClick = (eventInfo) => {
    doOpenLessonViewModal(eventInfo.event.id);
  };

  const [
    lessonViewModalVisible,
    setLessonViewModalVisible,
  ] = useState(false);
  const [lessonId4View, setLessonId4View] = useState(null);

  const doCloseLessonViewModal = () => {
    setLessonViewModalVisible(false);
  };

  const doOpenLessonViewModal = (id) => {
    setLessonId4View(id);
    setLessonViewModalVisible(true);
  };

  const doLessonFormModal = () => {
    setLessonFormFromRecurringLessonId(lessonId4View);
    setNewLessonDueDate(null);
    setLessonFormModalVisible(true);
  };

  const [
    recurringLessonModalVisible,
    setRecurringLessonModalVisible,
  ] = useState(false);
  const [recurringLessonDate, setRecurringLessonDate] =
    useState(null);

  const doCloseRecurringLessonModal = () => {
    setRecurringLessonModalVisible(false);
  };

  const doOpenRecurringLessonModal = (date) => {
    setRecurringLessonDate(date);
    setRecurringLessonModalVisible(true);
  };

  const [
    lessonFormModalVisible,
    setLessonFormModalVisible,
  ] = useState(false);
  const [newLessonDueDate, setNewLessonDueDate] =
    useState(null);
  const [
    lessonFormFromRecurringLessonId,
    setLessonFormFromRecurringLessonId,
  ] = useState(null);

  const doCloseLessonFormModal = () => {
    setLessonFormModalVisible(false);
  };

  const doOpenLessonFormModal = (id, dueDate = null) => {
    setLessonFormFromRecurringLessonId(id);
    setNewLessonDueDate(dueDate);
    setLessonFormModalVisible(true);
  };

  const doSuccessOnEditLessonFormModal = () => {
    Message.success(i18n('lesson.update.success'));
    doCloseLessonFormModal();
    calendarRef.current.getApi().refetchEvents();
  };

  const doSuccessOnNewLessonFormModal = () => {
    Message.success(i18n('lesson.create.success'));
    doCloseLessonFormModal();
    doCloseRecurringLessonModal();
    calendarRef.current.getApi().refetchEvents();
  };

  return (
    <>
      <Card sx={{ height: '100%' }}>
        <MDBox
          pt={title || date ? 2.4 : 0}
          px={1.6}
          lineHeight={1}
        >
          {title ? (
            <MDTypography
              variant="h6"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {title}
            </MDTypography>
          ) : null}
          {date ? (
            <MDTypography
              component="p"
              variant="button"
              color="text"
              fontWeight="regular"
            >
              {date}
            </MDTypography>
          ) : null}
        </MDBox>
        <MDBox height="100%">
          <CalendarRoot p={1.6} ownerState={{ darkMode }}>
            {useMemo(
              () => (
                <FullCalendar
                  ref={calendarRef}
                  initialView="dayGridMonth"
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right:
                      'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                  }}
                  plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                    rrulePlugin,
                  ]}
                  dateClick={handleDateClick}
                  events={handleEvents}
                  eventClick={handleEventClick}
                  eventContent={(
                    eventInfo: EventContentArg,
                  ) => {
                    const viewType =
                      calendarRef.current.getApi().view
                        .type;
                    if (viewType === 'listWeek') {
                      return `${eventInfo.event.extendedProps.class?.name}`;
                    }
                    return (
                      <div className="fc-event-main-frame">
                        <div className="fc-event-title-container">
                          <div className="fc-event-title fc-sticky">
                            <span>
                              {`${eventInfo.event.extendedProps.class?.name} `}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                  height="100%"
                />
              ),
              [dispatch],
            )}
          </CalendarRoot>
          {isLoading && (
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="absolute"
              width="100%"
              height="100%"
              top="0"
              zIndex={2}
            >
              <Spinner size={100} />
            </MDBox>
          )}
        </MDBox>
      </Card>
      {lessonViewModalVisible && (
        <LessonViewModal
          id={lessonId4View}
          onClose={doCloseLessonViewModal}
          onEdit={doLessonFormModal}
          onSuccess={doSuccessOnEditLessonFormModal}
        />
      )}
      {editable && recurringLessonModalVisible && (
        <RecurringLessonModal
          date={recurringLessonDate}
          onOpenLessonFormModal={doOpenLessonFormModal}
          onClose={doCloseRecurringLessonModal}
        />
      )}
      {editable && lessonFormModalVisible && (
        <LessonFormModal
          id={lessonFormFromRecurringLessonId}
          dueDate={newLessonDueDate}
          onClose={doCloseLessonFormModal}
          onSuccess={doSuccessOnNewLessonFormModal}
        />
      )}
    </>
  );
}

LessonsOnCalendar.defaultProps = {
  title: i18n('widgets.lessonsOnCalendar.title'),
};

export default LessonsOnCalendar;
