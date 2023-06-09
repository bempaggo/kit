export class Util {
	static getDateAsString(data: Date): string | undefined {
		if (data) {
			const year = data.getFullYear().toString();
			const month = (data.getMonth() + 1).toString().padStart(2, "0");
			const day = data.getDate().toString().padStart(2, "0");
			return `${year}-${month}-${day}`;
		} else {
			return undefined
		}
	}

  static percentToAbsolut(number: number) {
    const multipliedNumber = number * 100000;
    return Math.floor(multipliedNumber);
  }

  static createCurrentDateAddingDays(days: number): Date { 
    return Util.createDateFromDays(new Date(), days);
  }

  static createDateFromDays(date: Date, days: number): Date {
    if (days < 0 ) {
      throw new Error("Days must be greater than zero");
    }
    const newDate = new Date(date.getTime());

    newDate.setDate(date.getDate() + days);
    return newDate;
  }
}