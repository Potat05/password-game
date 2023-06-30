
import type { Password } from "../password";
import { Rule, RuleSatisfactionSeverity, type RuleSatisfaction } from "../rule";



function isValidDate(d: Date): boolean {
    return !(Number.isNaN(d.getTime()));
}



function findAllDatesInString(str: string): Date[] {
    let found: Date[] = [];

    for(let i = 0; i < str.length; i++) {
        for(let j = i; j <= str.length; j++) {
            // TODO: This may break with different locales. (Maybe check all of them if any of them match?)
            // But it should be fine for now just to use the default that the browser gives.
            const search = new Date(str.slice(i, j));

            if(isValidDate(search)) {
                found.push(search);
            }
        }
    }

    return found;
}



export class Rule_MustIncludeTodaysDate extends Rule {

    get ruleText(): string {
        return 'Your password must include todays date. (Based on your browsers locale.)';
    }

    constructor(password: Password) {
        super(password);
    }

    satisfies(): RuleSatisfaction {

        const today = new Date();

        const foundDates = findAllDatesInString(this.password.text);

        if(foundDates.some(date => {
            return (
                date.getDate() == today.getDate() &&
                date.getMonth() == today.getMonth() &&
                date.getFullYear() == today.getFullYear()
            );
        })) {
            return {
                rule: this,
                satisfied: true
            }
        }



        return {
            rule: this,
            satisfied: false,
            severity: RuleSatisfactionSeverity.VeryHigh
        }

    }

}
