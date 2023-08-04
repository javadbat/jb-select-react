/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
import 'jb-select';
import PropTypes from 'prop-types';
import { useEvent } from '../../custom-hooks/UseEvent';
// eslint-disable-next-line no-duplicate-imports
import { JBSelectWebComponent } from 'jb-select';
export type JBSelectEventType<T> = T & {
    target: JBSelectWebComponent
}
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
      interface IntrinsicElements {
        'jb-select': JBSelectType;
      }
      interface JBSelectType extends React.DetailedHTMLProps<React.HTMLAttributes<JBSelectWebComponent>, JBSelectWebComponent> {
        class?:string,
        label?: string,
        name?:string,
        required?:string | boolean,
        message?:string,
        // ref:React.RefObject<JBDateInputWebComponent>,
      }
    }
}

export const JBSelect = React.forwardRef((props:JBSelectProps, ref) => {
    const element = useRef<JBSelectWebComponent>(null);
    const [refChangeCount, refChangeCountSetter] = useState(0);
    useImperativeHandle(
        ref,
        () => (element ? element.current : {}),
        [element],
    );
    useEffect(() => {
        refChangeCountSetter(refChangeCount + 1);
    }, [element.current]);
    useEffect(() => {
        if(element.current){
            element.current.value = props.value;
        }
    }, [props.value]);
    useEffect(() => {
        if (typeof props.getOptionTitle == "function" && element.current) {
            element.current.callbacks.getOptionTitle = props.getOptionTitle;
        }
    }, [props.getOptionTitle]);
    useEffect(() => {
        if (typeof props.getOptionTitle == "function" && element.current) {
            element.current.callbacks.getOptionTitle = props.getOptionTitle;
        }
    }, [props.getOptionTitle]);
    useEffect(() => {
        if (typeof props.getOptionDOM == "function" && element.current) {
            element.current.callbacks.getOptionDOM = props.getOptionDOM;
        }
    }, [props.getOptionDOM]);
    useEffect(() => {
        if (typeof props.getSelectedValueDOM == "function" && element.current && element.current) {
            element.current.callbacks.getSelectedValueDOM = props.getSelectedValueDOM;
        }
    }, [props.getSelectedValueDOM]);
    useEffect(() => {
        if(element.current){
            element.current.optionList = props.optionList || [];
        }
    }, [props.optionList]);
    useEffect(() => {
        if (props.message !== null && props.message !== undefined ) {
            element.current?.setAttribute("message", props.message);
        }
    }, [props.message]);
    useEffect(() => {
        if (props.placeholder !== null && props.placeholder !== undefined) {
            element.current?.setAttribute("placeholder", props.placeholder);
        }
    }, [props.placeholder]);
    useEffect(() => {
        if (props.searchPlaceholder !== null && props.searchPlaceholder !== undefined) {
            element.current?.setAttribute("search-placeholder", props.searchPlaceholder);
        }
    }, [props.searchPlaceholder]);
    function onKeyup(e:JBSelectEventType<KeyboardEvent>) {
        if (props.onKeyup) {
            props.onKeyup(e);
        }
    }
    function onChange(e:JBSelectEventType<Event>) {
        if (props.onChange) {
            props.onChange(e);
        }
    }
    useEvent(element.current, 'keyup', onKeyup);
    useEvent(element.current, 'change', onChange);
    return (
        <jb-select class={props.className?props.className:""} label={props.label} ref={element} required={props.required || false}>
            {props.children}
        </jb-select>
    );
});

export type JBSelectProps = {
    label?: string,
    optionList?: any[],
    getOptionTitle?: (option:any)=>string,
    getOptionValue?: (option:any)=>string,
    getOptionDOM?: (option:any,onSelectCallback: (e: MouseEvent) => void, isSelected: boolean)=>HTMLElement,
    getSelectedValueDOM?: (option:any)=>HTMLElement,
    value?: any,
    onChange?: (e:JBSelectEventType<Event>)=>void,
    onKeyup?: (e:JBSelectEventType<KeyboardEvent>)=>void,
    required?: boolean,
    message?: string,
    placeholder?: string,
    searchPlaceholder?: string,
    className?: string,
    children?:any,
}
JBSelect.propTypes = {
    label: PropTypes.string,
    optionList: PropTypes.array,
    getOptionTitle: PropTypes.func,
    getOptionValue: PropTypes.func,
    getOptionDOM: PropTypes.func,
    getSelectedValueDOM: PropTypes.func,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onKeyup: PropTypes.func,
    required: PropTypes.bool,
    message: PropTypes.string,
    placeholder: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    className: PropTypes.string,
};
JBSelect.displayName = 'JBSelect';