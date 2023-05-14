import React, { useMemo } from 'react'
import { colors, fonts } from '~/styles/theme';
import { Calendar as Calendario, CalendarUtils } from 'react-native-calendars';

import { LocaleConfig } from 'react-native-calendars';

import { Box, IBoxProps } from 'native-base';

import { addMonths } from 'date-fns';

LocaleConfig.locales['br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'br';
export type markedDates = {
  [key: string]: {
    dotColor: string;
    marked: boolean;
  }
}
type Props = IBoxProps & {
  selected: string;
  current: Date | string;
  onDayPress: (day: any) => void;
  dates?: markedDates
}

const Calendar = ({selected, dates, current, onDayPress, ...props}: Props) => {
  
  const getDate = () => {
    const date = new Date(current);
    const newDate = date.setDate(date.getDate());
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const marked = useMemo(() => {
    return {
      [getDate()]: {
        dotColor: colors.primary,
        marked: false,
      },
      ...dates,
      [selected]: {
        customStyles: {
          container: {
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            borderRadius: 8,
          },
          text: {
            color: colors.white,
            fontFamily: fonts.bold,
          },
        }
      }
    };
  }, [selected]);

  return (
    <Box {...props}>
      <Calendario
        markingType={'custom'}
        current={current as any}
        onDayPress={onDayPress}
        markedDates={marked as any}
        style={{ borderRadius: 10 }}
        theme={{
          calendarBackground: colors.secondary,
          monthTextColor: colors.grey400,
          arrowColor: colors.grey400,
          dayTextColor: colors.grey400,
          todayTextColor: colors.primary,
          textSectionTitleColor: colors.primary,
          textDisabledColor: colors.border,
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 12,
          textDayFontFamily: fonts.medium,
          textMonthFontFamily: fonts.bold,
          textDayHeaderFontFamily: fonts.bold,
        }}
      />
    </Box>
  )
}

export default Calendar