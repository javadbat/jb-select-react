/* eslint-disable react/display-name */
import React, { useEffect, useRef, useState, useImperativeHandle } from 'react';
import 'jb-select';
import PropTypes from 'prop-types';
import { useEvent } from '../../custom-hooks/UseEvent';

export const JBSelect = React.forwardRef((props, ref) => {
    let element = useRef();
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
        element.current.value = props.value;
    }, [props.value]);
    useEffect(() => {
        if (typeof props.getOptionTitle == "function") {
            element.current.callbacks.getOptionTitle = props.getOptionTitle;
        }
    }, [props.getOptionTitle]);
    useEffect(() => {
        if (typeof props.getOptionTitle == "function") {
            element.current.callbacks.getOptionTitle = props.getOptionTitle;
        }
    }, [props.getOptionTitle]);
    useEffect(() => {
        if (typeof props.getOptionDOM == "function") {
            element.current.callbacks.getOptionDOM = props.getOptionDOM;
        }
    }, [props.getOptionDOM]);
    useEffect(() => {
        if (typeof props.getSelectedValueDOM == "function") {
            element.current.callbacks.getSelectedValueDOM = props.getSelectedValueDOM;
        }
    }, [props.getSelectedValueDOM]);
    useEffect(() => {
        element.current.optionList = props.optionList;
    }, [props.optionList]);
    useEffect(() => {
        if (props.message !== null && props.message !== undefined) {
            element.current.setAttribute("message", props.message);
        }
    }, [props.message]);
    useEffect(() => {
        if (props.placeholder !== null && props.placeholder !== undefined) {
            element.current.setAttribute("placeholder", props.placeholder);
        }
    }, [props.placeholder]);
    useEffect(() => {
        if (props.searchPlaceholder !== null && props.searchPlaceholder !== undefined) {
            element.current.setAttribute("search-placeholder", props.searchPlaceholder);
        }
    }, [props.searchPlaceholder]);
    function onKeyup(e) {
        if (props.onKeyup) {
            props.onKeyup(e);
        }
    }
    function onChange(e) {
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