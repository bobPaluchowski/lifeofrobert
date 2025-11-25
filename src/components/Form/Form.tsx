import React, { useState } from 'react';

type InputType =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'checkbox'
  | 'select'
  | 'textarea'
  | 'date';

type FormField = {
  name: string;
  label: string;
  type: InputType;
  required?: boolean;
  options?: { label: string; value: string }[]; // For select fields
  placeholder?: string;
};

type UniversalFormProps = {
  fields: FormField[];
  onSubmit: (formData: Record<string, any>) => void;
  submitLabel?: string;
  style?: React.CSSProperties;
  fieldStyle?: React.CSSProperties;
};

const UniversalForm: React.FC<UniversalFormProps> = ({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  style = {},
  fieldStyle = {}
}) => {
  const initialState = fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]:
        field.type === 'checkbox'
          ? false
          : field.type === 'number'
            ? 0
            : '',
    }),
    {}
  );

  const [formData, setFormData] = useState<Record<string, any>>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required.`;
      }
    });
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit} style={style}>
      {fields.map(field => (
        <div key={field.name} style={{ marginBottom: '1.2em', ...fieldStyle }}>
          <label style={{ fontWeight: 500, marginBottom: '.45em', display: 'block' }}>
            {field.label}
            {field.required && <span style={{ color: '#cc2233', marginLeft: 4 }}>*</span>}
          </label>
          {field.type === 'select' ? (
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              style={{
                padding: '0.5em',
                borderRadius: '7px',
                border: '1px solid #ccc',
                width: '100%',
              }}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              placeholder={field.placeholder}
              style={{
                padding: '0.5em',
                borderRadius: '7px',
                border: '1px solid #ccc',
                width: '100%',
              }}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={
                field.type === 'checkbox'
                  ? undefined
                  : formData[field.name]
              }
              checked={field.type === 'checkbox' ? formData[field.name] : undefined}
              onChange={handleChange}
              required={field.required}
              placeholder={field.placeholder}
              style={{
                padding: field.type === 'checkbox' ? 0 : '0.5em',
                borderRadius: field.type === 'checkbox' ? 0 : '7px',
                border: field.type === 'checkbox' ? undefined : '1px solid #ccc',
                width: field.type === 'checkbox' ? undefined : '100%',
                marginLeft: field.type === 'checkbox' ? 8 : 0,
              }}
            />
          )}
          {errors[field.name] && (
            <div style={{ color: '#cc2233', fontSize: '.95em', marginTop: '.3em' }}>
              {errors[field.name]}
            </div>
          )}
        </div>
      ))}
      <button
        type="submit"
        style={{
          background: '#4A55A4',
          color: '#fff',
          padding: '0.7em 2em',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '1.08em',
          marginTop: '1em',
          cursor: 'pointer',
        }}
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default UniversalForm;
