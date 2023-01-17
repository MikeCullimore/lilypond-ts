% ABRSM scales and arpeggios
% Grade 2
% G major, two octaves, hands together.

\version "2.22.2"

\include "common.ly"

common = {
    \key g \major
    % TODO: move the following into common config.
    \omit Staff.TimeSignature
    \override Staff.BarLine.break-visibility = ##(#f #f #f)
}

right = \relative {
    \common
    \clef treble
    g8-1 a b-3 c-1 d e fis-4
    g-1 a b-3 c-1 d e fis-4
    g-5 fis-4 e d c-1 b-3 a
    g-1 fis-4 e d c-1 b-3 a
    g4-1
}

left = \relative {
    \common
    \clef bass
    g,8-5 a b c d-1 e-3 fis
    g-1 a-4 b c d-1 e-3 fis
    g-1 fis e-3 d-1 c b a-4
    g-1 fis e-3 d-1 c b a
    g4
}

\score {
    \new PianoStaff
    <<
        \new Staff \right
        \new Staff \left
    >>
    \layout {
        \context {
            \Staff
        }
    }
    \midi {}
}
