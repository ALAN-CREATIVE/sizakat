import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from "./Button"

export default {
    component : Button,
    title : 'Button',
    excludeStories: /.*Data$/,
};

export const primaryButtonData = {
    label: 'Primary',
    type: 'primary',
}
export const secondaryButtonData = {
    label: 'Secondary',
    type: 'secondary',
}
export const tertiaryButtonData = {
    label: 'Tertiary',
    type: 'tertiary',
}
export const dangerButtonData = {
    label: 'Danger',
    type: 'danger',
}
export const roundButtonData = {
    label: ' + ',
    type: 'round',
}
  
export const Primary = () => <Button {...primaryButtonData} onClick={action('clicked')}/>
export const Secondary = () => <Button {...secondaryButtonData} onClick={action('clicked')}/>
export const tertiary = () => <Button {...tertiaryButtonData} onClick={action('clicked')}/>
export const Danger = () => <Button {...dangerButtonData} onClick={action('clicked')}/>
export const Round = () => <Button {...roundButtonData} onClick={action('clicked')}/>
