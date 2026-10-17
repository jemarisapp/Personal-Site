'use client'

import { useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import s from './console-prototype.module.css'

type Player = 'mordecai' | 'rigby'
type Screen = 'boot' | 'profiles' | 'themes' | 'home'

const shot = (name: string) => `/work/playstation/ui-${name}.webp`

const ALL_SHOTS = [
  'boot',
  'profile-mordecai',
  'profile-rigby',
  'theme-mordecai',
  'theme-rigby',
  'home-mordecai',
  'home-rigby',
]

const NAMES: Record<Player, string> = { mordecai: 'Regular Guy (Mordecai)', rigby: 'Game Wizard (Rigby)' }

// Clickable areas over each recorded screen, as fractions of the display.
type Spot = { x: number; y: number; w: number; h: number; round?: boolean }
const SPOTS = {
  ps: { x: 0.468, y: 0.445, w: 0.064, h: 0.114, round: true },
  avatar: {
    mordecai: { x: 0.43, y: 0.48, w: 0.136, h: 0.242, round: true },
    rigby: { x: 0.613, y: 0.48, w: 0.136, h: 0.242, round: true },
  },
  theme: {
    // Big card for the focused theme, small icon for the other one.
    mordecai: { big: { x: 0.106, y: 0.212, w: 0.448, h: 0.572 }, small: { x: 0.765, y: 0.38, w: 0.13, h: 0.232 } },
    rigby: { big: { x: 0.443, y: 0.212, w: 0.452, h: 0.572 }, small: { x: 0.102, y: 0.38, w: 0.133, h: 0.232 } },
  },
  play: { x: 0.088, y: 0.77, w: 0.172, h: 0.072 },
} satisfies Record<string, unknown>

const STEPS: Record<Screen, string> = {
  boot: 'Press the PS button to wake the console.',
  profiles: 'Choose who’s playing. Arrow keys move between players.',
  themes: 'Pick a theme. The other player’s theme waits to the side.',
  home: 'The home screen takes on the theme you chose.',
}

function spotStyle(sp: Spot): CSSProperties {
  return { left: `${sp.x * 100}%`, top: `${sp.y * 100}%`, width: `${sp.w * 100}%`, height: `${sp.h * 100}%` }
}

export function ConsolePrototype() {
  const [screen, setScreen] = useState<Screen>('boot')
  const [player, setPlayer] = useState<Player>('mordecai')
  const reduceMotion = useReducedMotion()
  const screenRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  const current =
    screen === 'boot'
      ? 'boot'
      : screen === 'profiles'
        ? `profile-${player}`
        : screen === 'themes'
          ? `theme-${player}`
          : `home-${player}`

  // Move focus to the main control of each new screen so keyboard play
  // feels like holding a controller.
  useEffect(() => {
    // Leave focus alone on page load; only follow along once someone plays.
    if (!started.current) return
    const el = screenRef.current?.querySelector<HTMLButtonElement>('[data-primary="true"]')
    el?.focus({ preventScroll: true })
  }, [screen, player])

  const other: Player = player === 'mordecai' ? 'rigby' : 'mordecai'

  const onKeyDown = (e: KeyboardEvent) => {
    if ((screen === 'profiles' || screen === 'themes') && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
      e.preventDefault()
      setPlayer(other)
    } else if (e.key === 'Escape' || e.key === 'Backspace') {
      e.preventDefault()
      setScreen((sc) => (sc === 'home' ? 'themes' : sc === 'themes' ? 'profiles' : 'boot'))
    }
  }

  return (
    <div className={s.root}>
      <div className={s.tv}>
        <div
          className={s.screen}
          ref={screenRef}
          onKeyDown={onKeyDown}
          onPointerDown={() => (started.current = true)}
          onKeyDownCapture={() => (started.current = true)}
          data-motion={!reduceMotion}
        >
          {ALL_SHOTS.map((name) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={name} src={shot(name)} alt="" className={s.shot} data-on={name === current} loading="eager" />
          ))}

          {screen === 'boot' && (
            <button
              type="button"
              className={s.spot}
              data-round
              data-primary="true"
              style={spotStyle(SPOTS.ps)}
              onClick={() => setScreen('profiles')}
              aria-label="Press the PS button"
            />
          )}

          {screen === 'profiles' &&
            (['mordecai', 'rigby'] as Player[]).map((p) => (
              <button
                key={p}
                type="button"
                className={s.spot}
                data-round
                data-primary={p === player}
                style={spotStyle(SPOTS.avatar[p])}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setPlayer(p)}
                onFocus={() => setPlayer(p)}
                onClick={() => {
                  setPlayer(p)
                  setScreen('themes')
                }}
                aria-label={`Play as ${NAMES[p]}`}
              />
            ))}

          {screen === 'themes' && (
            <>
              <button
                type="button"
                className={s.spot}
                data-primary="true"
                style={spotStyle(SPOTS.theme[player].big)}
                onClick={() => setScreen('home')}
                aria-label={`Use the ${player === 'mordecai' ? 'Player One' : 'Player Two'} theme`}
              />
              <button
                type="button"
                className={s.spot}
                style={spotStyle(SPOTS.theme[player].small)}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setPlayer(other)}
                onClick={() => setPlayer(other)}
                aria-label={`Look at the ${other === 'mordecai' ? 'Player One' : 'Player Two'} theme`}
              />
            </>
          )}

          {screen === 'home' && (
            <button
              type="button"
              className={s.spot}
              data-primary="true"
              style={spotStyle(SPOTS.play)}
              onClick={() => setScreen('boot')}
              aria-label="Play Game, which ends the demo and returns to the start"
            />
          )}
        </div>
      </div>
      <div className={s.stand} aria-hidden />

      <div className={s.footer}>
        <p className={s.step} aria-live="polite">
          {STEPS[screen]}
        </p>
        {screen !== 'boot' && (
          <button type="button" className={s.restart} onClick={() => setScreen('boot')}>
            Start over
          </button>
        )}
      </div>
    </div>
  )
}
