import { useState } from "react";

interface ValidationRule {
  required?: boolean; //  Campo obligatorio
  pattern?: RegExp; //  Expresión regular
  lessThan?: number; //  Menor a
  moreThan?: number; //  Mayor a
  lessEqThan?: number; //  Menor igual a
  moreEqThan?: number; //  Mayor igual a
  limitWords?: number; //  Cantidad de palabras

  noEmpty?: boolean; //  Array con al menos un elemento
  limitItems?: number; // Límite para un array

  isFile?: boolean; //  Es un archivo (validación diferente)
  maxSize?: number; //  Tamaño del archivo en Kb
  custom?: (value: any) => boolean; //  Función de validación propia
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

const useFormValidation = <T extends {}>(
  initialState: T,
  validationRules: ValidationRules
) => {
  //  States
  const [formValues, setFormValues] = useState<T>(initialState);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof T, string>>
  >({});

  //  Validar campo
  const validateField = (name: keyof T, value: any) => {
    const rule = validationRules[name as string];

    if (!rule) return true;

    //  Archivos
    if (rule.isFile) {
      if (rule.required && !value[0]) return "Archivo necesario";

      if (value[0] && rule.maxSize && value[0].size > rule.maxSize * 1024)
        return `El archivo deber ser menor a ${rule.maxSize} Kb`;
    }
    //  Array
    else if (rule.noEmpty) {
      if (rule.required && value.length == 0) return "Campo requerido";

      if (rule.limitItems && value.length > rule.limitItems)
        return "Límite de items superado";
    } else {
      //  Texto
      if (rule.required && !value) return "Campo requerido";

      //  Regex
      if (
        rule.pattern &&
        value !== null &&
        !rule.pattern.test(value) &&
        (rule.required || value !== "")
      )
        return "Valor inválido";

      //  Cantidades
      if (rule.lessThan && value >= rule.lessThan)
        return `No puede colocar un valor mayor o igual a ${rule.lessThan}`;
      if (rule.moreThan && value <= rule.moreThan)
        return `No puede colocar un valor menor o igual a ${rule.moreThan}`;
      if (rule.lessEqThan && value > rule.lessEqThan)
        return `No puede colocar un valor mayor a ${rule.lessEqThan}`;
      if (rule.moreEqThan && value <= rule.moreEqThan)
        return `No puede colocar un valor menor a ${rule.moreEqThan}`;
    }

    return true;
  };

  //  Actualizar valor
  const handleChange = (name: keyof T, value: any) => {
    const error = validateField(name, value);
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: error === true ? "" : error,
    }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors: Partial<Record<keyof T, string>> = {};

    //  Validación individual
    for (let name in formValues) {
      const value = formValues[name];
      const error = validateField(name as keyof T, value);
      if (error !== true) {
        valid = false;
        newErrors[name as keyof T] = error;
      }
    }

    setFormErrors(newErrors);
    return valid;
  };

  return {
    formValues,
    formErrors,
    handleChange,
    validateForm,
    setFormValues,
  };
};

export default useFormValidation;
