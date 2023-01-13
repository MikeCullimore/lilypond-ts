% ABRSM scales and arpeggios
% Grade 2
% G major, two octaves, hands together.

% todo
% Fingering (how to automate?).
% Import common by absolute path or inject directly?

\version "2.22.2"

\include "common.ly"

common = {
    \key g \major
    \omit Staff.TimeSignature
    % \omit Staff.BarLine % Leaves bar lines between staffs.
    \override Staff.BarLine.break-visibility = ##(#f #f #f)
}

right = \relative {
    \common
    \clef treble
    g8 a b c d e fis
    g a b c d e fis
    g fis e d c b a
    g fis e d c b a
    g4
}

left = \relative {
    \common
    \clef bass
    g,8 a b c d e fis
    g a b c d e fis
    g fis e d c b a
    g fis e d c b a
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
