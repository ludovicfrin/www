/**
 * List of utilities with the dates
 * Use the Momentjs library
 * 
 * @see https://momentjs.com
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import * as moment from 'moment';
import { Moment } from 'moment';

export class DateUtils {
    
  /**
   * Getter for the current date
   * 
   * @see https://momentjs.com/docs/#/get-set/set/
   * @param format Return format (if not set return a Moment format)
   * @return Current date
   */
  public static getCurrent(format: string = null): any {
    return DateUtils.formatDate(moment(), format);
  }    
  
  /**
   * Getter for the current day
   * 
   * @see https://momentjs.com/docs/#/get-set/set/
   * @param format Return format (if not set return a Moment format)
   * @return Current day
   */
  public static getThisDay(format: string = null): any {
    let date = moment().set({
      hour: 0,
      minute:0,
      second: 0,
      millisecond: 0
    });
    return DateUtils.formatDate(date, format);
  } 
    
  /**
   * Getter for the first day of this week
   * 
   * @https://momentjs.com/docs/#/get-set/set/
   * @param format Return format (if not set return a Moment format)
   * @return Current week
   */
  public static getFirstDayOfThisWeek(format: string = null): any {
    let date = moment().set({
      hour: 0,
      minute:0,
      second: 0,
      millisecond: 0
    }).day ('Monday');
      
    return DateUtils.formatDate(date, format);
  }
    
  /**
   * Getter for the first day of this month
   * 
   * @https://momentjs.com/docs/#/get-set/set/
   * @param format Return format (if not set return a Moment format)
   * @return Current month
   */
  public static getFirstDayOfThisMonth(format: string = null): any {
    let date = moment().set({
      date: 1,
      hour: 0,
      minute:0,
      second: 0,
      millisecond: 0
    });
      
    return DateUtils.formatDate(date, format);
  }
    
  /**
   * Getter for the first day of this year
   * 
   * @https://momentjs.com/docs/#/get-set/set/
   * @param format Return format (if not set return a Moment format)
   * @return Current month
   */
  public static getFirstDayOfThisYear(format: string = null): any {
    let date = moment().set({
      dayOfYear: 1,
      hour: 0,
      minute:0,
      second: 0,
      millisecond: 0
    });
      
    return DateUtils.formatDate(date, format);
  } 
    
  /**
   * Getter for the start end the end date of a period
   * 
   * @param period Period
   * @param format Return format (if not set return a Moment format)
   * @return Object with start and end date
   */
  public static getStartAndEndOfPeriod(period: string, format: string = null): any {
    let result: any;
      
    switch (period) {
      case 'today':
        result = DateUtils.getStartAndEndOfToday(format);
        break;
      case 'yesterday':
        result = DateUtils.getStartAndEndOfYesterday(format);
        break;        
      case 'thisweek':
        result = DateUtils.getStartAndEndOfThisWeek(format);
        break;
      case 'lastweek':
        result = DateUtils.getStartAndEndOfLastWeek(format);
        break;        
      case 'thismonth':
        result = DateUtils.getStartAndEndOfThisMonth(format);
        break;
      case 'lastmonth':
        result = DateUtils.getStartAndEndOfLastMonth(format);
        break;        
      case 'thisyear':
        result = DateUtils.getStartAndEndOfThisYear(format);
        break;
      case 'lastyear':
       result = DateUtils.getStartAndEndOfLastYear(format);
       break;
      case 'lastsevendays':
       result = DateUtils.getStartAndEndOfLastSevenDays(format);
       break;
      case 'lastthirtydays':
       result = DateUtils.getStartAndEndOfLastThirtyDays(format);
       break;       
    }
    return result;
  }

  /**
   * Getter for the start end the end date of today
   * 
   * @param format Return format (if not set return a Moment format)
   * @return Object with start and end date
   */
  public static getStartAndEndOfToday(format: string = null): any {
    return {
      start: DateUtils.getThisDay(format),
      end: DateUtils.getCurrent(format)
    };
  }

  /**
   * Getter for the start end the end date of yesterday
   * 
   * @param format Return format (if not set return a Moment format)
   * @return Object with start and end date
   */
  public static getStartAndEndOfYesterday(format: string = null): any {
    return {
      start: this.formatDate(DateUtils.getThisDay().substract(1, 'days'), format),
      end: this.formatDate(DateUtils.getThisDay().substract(1, 'milliseconds'), format)
    };
  } 
    
  /**
   * Getter for the start end the end date of this week
   * 
   * @param format Return format (if not set return a Moment format)
   * @return Object with start and end date
   */
  public static getStartAndEndOfThisWeek(format: string = null): any {
    return {
      start: DateUtils.getFirstDayOfThisWeek(format),
      end: DateUtils.getCurrent(format)
    };
  }

  /**
   * Getter for the start end the end date of this last week
   * 
   * @param format Return format (if not set return a Moment format)
   * @return Object with start and end date
   */
  public static getStartAndEndOfLastWeek(format: string = null): any {
    return {
      start: this.formatDate(DateUtils.getFirstDayOfThisWeek().subtract(1, 'weeks',)),
      end: this.formatDate(DateUtils.getFirstDayOfThisWeek().subtract(1, 'milliseconds'))
    };
  }  
    
  /**
   * Getter for the start end the end date of this month
   * 
   * @param format Return format (if not set return a Moment format)
   * @return Object with start and end date
   */
  public static getStartAndEndOfThisMonth(format: string = null): any {
    return {
      start: DateUtils.getFirstDayOfThisMonth(format),
      end: DateUtils.getCurrent(format)
    };
  }

  /**
   * Getter for the start end the end date of this last month
   * 
   * @param format Return format (if not set return a Moment format)
   * @return Object with start and end date
   */
  public static getStartAndEndOfLastMonth(format: string = null): any {
    return {
      start: this.formatDate(DateUtils.getFirstDayOfThisMonth().subtract(1, 'months')),
      end: this.formatDate(DateUtils.getFirstDayOfThisMonth().subtract(1, 'milliseconds'))
    };
  }   
    
  /**
   * Getter for the start end the end date of this year
   * 
   * @param format Return format (if not set return a Moment format)
   * @return Object with start and end date
   */
  public static getStartAndEndOfThisYear(format: string = null): any {
    return {
      start: DateUtils.getFirstDayOfThisYear(format),
      end: DateUtils.getCurrent(format)
    };
  }
  
  /**
   * Getter for the start end the end date of this last year
   * 
   * @param format Return format (if not set return a Moment format)
   * @return Object with start and end date
   */
  public static getStartAndEndOfLastYear(format: string = null): any {
    return {
      start: this.formatDate(DateUtils.getFirstDayOfThisYear().subtract(1, 'years')),
      end: this.formatDate(DateUtils.getFirstDayOfThisYear().subtract(1, 'milliseconds'))
    };
  } 
  
  /**
   * Getter for the start end the end date of this last 7 days
   * 
   * @param format Return format (if not set return a Moment format)
   * @return Object with start and end date
   */
  public static getStartAndEndOfLastSevenDays(format: string = null): any {
    return {
      start: this.formatDate(DateUtils.getThisDay().subtract(7, 'days')),
      end: DateUtils.getCurrent(format)
    };
  }
  
  /**
   * Getter for the start end the end date of this last 30 days
   * 
   * @param format Return format (if not set return a Moment format)
   * @return Object with start and end date
   */
  public static getStartAndEndOfLastThirtyDays(format: string = null): any {
    return {
      start: this.formatDate(DateUtils.getThisDay().subtract(30, 'days')),
      end: DateUtils.getCurrent(format)
    };
  }  
    
  /**
   * Format a date
   * 
   * @see https://momentjs.com/docs/#/displaying/
   * @param Date du format
   * @param Format token
   * @return Formatted date
   */
  private static formatDate(date: Moment, format: string = null): any {
    if (format == null) {
     return date;
    }
    return date.format(format);
  }
}
