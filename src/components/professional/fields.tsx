"use client";
import { useId, useState } from "react";

/**
 * Accessible form primitives shared by the registration steps.
 *
 * Every control gets a real `<label>`, errors are linked with
 * `aria-describedby` + `aria-invalid`, and each error is announced with text
 * and an icon so a mistake is never signalled by colour alone.
 */

export type Option = { value: string; label: string };

type BaseProps = {
  label: string;
  error?: string;
  help?: string;
  optional?: boolean;
  optionalLabel?: string;
  /** Stable id so the error summary can move focus to this control. */
  fieldId: string;
};

function Describers({ fieldId, help, error }: { fieldId: string; help?: string; error?: string }) {
  return (
    <>
      {help && <span className="field-help" id={`${fieldId}-help`}>{help}</span>}
      {error && (
        <span className="field-error" id={`${fieldId}-error`}>
          <span aria-hidden="true">⚠</span> {error}
        </span>
      )}
    </>
  );
}

const describedBy = (fieldId: string, help?: string, error?: string) =>
  [help && `${fieldId}-help`, error && `${fieldId}-error`].filter(Boolean).join(" ") || undefined;

function Legend({ label, optional, optionalLabel }: { label: string; optional?: boolean; optionalLabel?: string }) {
  return (
    <>
      {label}
      {optional && optionalLabel && <span className="field-optional"> ({optionalLabel})</span>}
    </>
  );
}

type TextFieldProps = BaseProps & {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "url" | "number";
  placeholder?: string;
  inputMode?: "text" | "email" | "tel" | "url" | "numeric" | "decimal";
  autoComplete?: string;
  min?: number;
  max?: number;
  prefix?: string;
};

export function TextField({
  fieldId, label, value, onChange, error, help, optional, optionalLabel,
  type = "text", placeholder, inputMode, autoComplete, min, max, prefix,
}: TextFieldProps) {
  const input = (
    <input
      id={fieldId}
      name={fieldId}
      type={type}
      value={value}
      placeholder={placeholder}
      inputMode={inputMode}
      autoComplete={autoComplete}
      min={min}
      max={max}
      onChange={(event) => onChange(event.target.value)}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(fieldId, help, error)}
    />
  );
  return (
    <div className={`field ${error ? "field-invalid" : ""}`}>
      <label htmlFor={fieldId}><Legend label={label} optional={optional} optionalLabel={optionalLabel} /></label>
      {prefix ? <div className="field-prefixed"><span aria-hidden="true">{prefix}</span>{input}</div> : input}
      <Describers fieldId={fieldId} help={help} error={error} />
    </div>
  );
}

type TextAreaProps = BaseProps & {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  counter?: string;
};

export function TextArea({ fieldId, label, value, onChange, error, help, optional, optionalLabel, rows = 6, counter }: TextAreaProps) {
  return (
    <div className={`field ${error ? "field-invalid" : ""}`}>
      <label htmlFor={fieldId}><Legend label={label} optional={optional} optionalLabel={optionalLabel} /></label>
      <textarea
        id={fieldId}
        name={fieldId}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(fieldId, help, error)}
      />
      {counter && <span className="field-counter" aria-live="polite">{counter}</span>}
      <Describers fieldId={fieldId} help={help} error={error} />
    </div>
  );
}

type SelectFieldProps = BaseProps & {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder: string;
};

export function SelectField({ fieldId, label, value, onChange, options, placeholder, error, help, optional, optionalLabel }: SelectFieldProps) {
  return (
    <div className={`field ${error ? "field-invalid" : ""}`}>
      <label htmlFor={fieldId}><Legend label={label} optional={optional} optionalLabel={optionalLabel} /></label>
      <select
        id={fieldId}
        name={fieldId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(fieldId, help, error)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
      </select>
      <Describers fieldId={fieldId} help={help} error={error} />
    </div>
  );
}

/** Single-choice group rendered as radios, for short option lists. */
export function RadioGroup({ fieldId, label, value, onChange, options, error, help }: SelectFieldProps) {
  return (
    <fieldset className={`field field-group ${error ? "field-invalid" : ""}`} aria-describedby={describedBy(fieldId, help, error)}>
      <legend>{label}</legend>
      <div className="choice-grid">
        {options.map((option) => (
          <label className="choice" key={option.value}>
            <input
              type="radio"
              name={fieldId}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      <Describers fieldId={fieldId} help={help} error={error} />
    </fieldset>
  );
}

type CheckboxGroupProps = BaseProps & {
  values: string[];
  onChange: (values: string[]) => void;
  options: Option[];
  columns?: boolean;
  selectedLabel?: string;
};

export function CheckboxGroup({
  fieldId, label, values, onChange, options, error, help, optional, optionalLabel, columns = true, selectedLabel,
}: CheckboxGroupProps) {
  const toggle = (value: string) =>
    onChange(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  return (
    <fieldset className={`field field-group ${error ? "field-invalid" : ""}`} aria-describedby={describedBy(fieldId, help, error)}>
      <legend><Legend label={label} optional={optional} optionalLabel={optionalLabel} /></legend>
      <div className={columns ? "choice-grid" : "choice-list"}>
        {options.map((option) => (
          <label className="choice" key={option.value}>
            <input
              type="checkbox"
              name={fieldId}
              value={option.value}
              checked={values.includes(option.value)}
              onChange={() => toggle(option.value)}
              aria-invalid={error ? true : undefined}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {selectedLabel && <span className="field-counter" aria-live="polite">{selectedLabel}</span>}
      <Describers fieldId={fieldId} help={help} error={error} />
    </fieldset>
  );
}

type SearchableGroupProps = CheckboxGroupProps & { searchPlaceholder: string; noResults: string };

/**
 * Checkbox group with a filter box, for long lists such as cities. The filter
 * is presentational: selections made before filtering are preserved.
 */
export function SearchableCheckboxGroup({ searchPlaceholder, noResults, ...props }: SearchableGroupProps) {
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const visible = needle
    ? props.options.filter((option) => option.label.toLowerCase().includes(needle))
    : props.options;
  return (
    <div className="searchable-group">
      <label className="sr-only" htmlFor={`${props.fieldId}-search`}>{searchPlaceholder}</label>
      <input
        id={`${props.fieldId}-search`}
        type="search"
        className="group-search"
        placeholder={searchPlaceholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {visible.length === 0
        ? <p className="field-help">{noResults}</p>
        : <CheckboxGroup {...props} options={visible} />}
    </div>
  );
}

type CheckboxProps = {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  help?: string;
  fieldId?: string;
};

export function Checkbox({ label, checked, onChange, error, help, fieldId }: CheckboxProps) {
  const generated = useId();
  const id = fieldId ?? generated;
  return (
    <div className={`field field-checkbox ${error ? "field-invalid" : ""}`}>
      <label className="choice" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, help, error)}
        />
        <span>{label}</span>
      </label>
      <Describers fieldId={id} help={help} error={error} />
    </div>
  );
}
