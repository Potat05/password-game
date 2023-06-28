
import type { Password } from "./password";



/**
 * How high this is in the priority to show above all other rules when invalid.  
 */
export enum RuleSatisfactionSeverity {
    None = 0,
    VeryLow = 1,
    Low = 2,
    Medium = 3,
    High = 4,
    VeryHigh = 5
}



export type RuleSatisfactionWhere = {
    index: number;
    length: number;
    severity?: RuleSatisfactionSeverity;
    message?: string;
};



export type RuleSatisfaction = {
    rule: Rule,
    satisfied: boolean;

    severity?: RuleSatisfactionSeverity;
    message?: string;

    where?: RuleSatisfactionWhere[];
}



export class Rule {

    get ruleText(): string {
        return 'unknown';
    }
    
    password: Password;

    constructor(password: Password) {
        this.password = password;
    }

    satisfies(): RuleSatisfaction {
        throw new Error('Unimplemented.');
    }

}


