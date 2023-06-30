# password-game

This is based off of [Neal's Password Game](https://neal.fun/password-game/)

I thought it would be a fun and short challenge to make, So here it is (:

Play the game: https://potat05.github.io/password-game/

## TODO

* Set up auto github pages.
* Slowly introduce more rules.
* Add event listener for rules to recheck password. (Needed for mustincludetodaysdate to not break on new day.)

## Developing

Once you've got the project, install dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of password-game:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
