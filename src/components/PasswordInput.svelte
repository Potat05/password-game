<script lang="ts">

    import { Password } from "../password";
    import { createEventDispatcher } from "svelte";
    const dispatcher = createEventDispatcher();



    let inputContainer: HTMLDivElement;

    export let password: Password = new Password();

    function componentUpdate() {
        password.text = inputContainer.textContent ?? '';
        dispatcher('passwordchange');
    }

</script>

<style>

    #password-input {
        padding: 10px;
        margin: 10px;
        display: block;
        width: calc(100% - 40px); /* TODO: Don't do this. */
        background-color: #222;
        color: white;
        font-size: xx-large;
        border: none;
        border-radius: 10px;
    }

    #password-input:empty::before {
        content: 'Password';
        cursor: text;
        color: gray;
        font-style: italic;
    }

</style>

<div
    bind:this={inputContainer}
    id="password-input"
    on:input={componentUpdate}
    spellcheck="false"
    contenteditable
/>
