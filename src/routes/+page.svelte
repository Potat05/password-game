<script lang="ts">
    import { onMount } from "svelte";
    import { Password } from "../password";
    import type { Rule, RuleSatisfaction } from "../rule";
    import { Rule_MinPasswordLength } from "../rules/minpasswordlength";
    import { Rule_MustIncludeNumber } from "../rules/mustincludenumber";
    import { Rule_NumbersMustAddToNumber } from "../rules/passwordmustadduptonumber";
    import { Rule_MustIncludeTodaysDate } from "../rules/mustincludetodaysdate";
    import { Rule_MaxPasswordLength } from "../rules/maxpasswordlength";


    
    function randomInRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }



    let password = new Password();

    let rules: Rule[] = [
        new Rule_MinPasswordLength(password, randomInRange(5, 10)),
        new Rule_MaxPasswordLength(password, 100),
        new Rule_MustIncludeNumber(password),
        new Rule_NumbersMustAddToNumber(password, randomInRange(40, 60)),
        new Rule_MustIncludeTodaysDate(password)
    ];



    let inputContainer: HTMLDivElement;



    type RuleSatisfactionWithIndex = RuleSatisfaction & {
        index: number;
    }

    let notSatisfied: RuleSatisfactionWithIndex[] = [];
    let satisfied: RuleSatisfactionWithIndex[] = [];



    function updateRules() {

        password.text = inputContainer.innerText;



        let satisfactions: RuleSatisfactionWithIndex[] = [];

        for(let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            const satisfaction = rule.satisfies();
            satisfactions.push({ ...satisfaction, index: i });
        }



        satisfied = satisfactions.filter(satisfaction => satisfaction.satisfied)
            .sort((a, b) => b.index - a.index);

        notSatisfied = satisfactions.filter(satisfaction => !satisfaction.satisfied)
            .sort((a, b) => (b?.severity ?? 99999 + b.index) - (a?.severity ?? 99999 + a.index));

    }



    onMount(() => {
        updateRules();
    });

</script>

<style>

    #password-input {
        padding: 10px;
        margin: 10px;
        background-color: #222;
        color: white;
        font-size: xx-large;
    }

    #password-input:empty::before {
        content: 'Password';
        cursor: text;
        color: gray;
        font-style: italic;
    }

    #win-message {
        color: limegreen;
        font-size: xx-large;
    }



    .rule {
        margin: 10px;
        border-radius: 10px;
        color: black;
        font-size: x-large;
    }

    .rule-password-num {
        border-radius: 10px 10px 0px 0px;
        padding: 6px 12px;
    }

    .rule-password-msg {
        border-radius: 0px 0px 10px 10px;
        padding: 8px 16px;
    }



    .not-satisfied.rule {
        background-color: #ffdfdf;
        border: 1px solid #a80000;
    }

    .not-satisfied .rule-password-num {
        background-color: #ffbaba;
    }

    .not-satisfied .rule-password-num::before {
        color: #a80000;
        content: '\2716';
        margin-right: 12px;
    }



    .satisfied.rule {
        background-color: #e0ffdf;
        border: 1px solid #0ea800;
    }

    .satisfied .rule-password-num {
        background-color: #c0ffba;
    }

    .satisfied .rule-password-num::before {
        color: #0ea800;
        content: '\2714';
        margin-right: 12px;
    }

</style>

<div
    bind:this={inputContainer}
    id="password-input"
    contenteditable="true"
    spellcheck="false"
    on:input={updateRules}
></div>

{#if notSatisfied.length == 0}

<div id="win-message">
    You win!
</div>

{/if}

<div id="password-rules">
    <div class="rule-container">
        {#each notSatisfied as satisfaction}
            <div class="rule not-satisfied">
                <div class="rule-password-num">Rule #{satisfaction.index + 1}</div>
                <div class="rule-password-msg">{satisfaction.message ?? satisfaction.rule.ruleText}</div>
            </div>
        {/each}
    </div>
    <div class="rule-container">
        {#each satisfied as satisfaction}
            <div class="rule satisfied">
                <div class="rule-password-num">Rule #{satisfaction.index + 1}</div>
                <div class="rule-password-msg">{satisfaction.rule.ruleText}</div>
            </div>
        {/each}
    </div>
</div>

