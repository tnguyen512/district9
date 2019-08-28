import Vue from 'vue'
import VeeValidate from 'vee-validate'

const config = {
  locale: 'vn',
  errorBagName: 'errors', // change if property conflicts
  fieldsBagName: 'fields',
  delay: 0,
  dictionary: null,
  strict: true,
  classes: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input|blur',
  inject: true,
  validity: false,
  aria: true
}
const dictionary = {
  'vn': {
    messages: {
      required: () => 'Không được để trống',
      email: () => 'Không đúng định dạng email',
      alpha: () => 'Chỉ bao gồm chữ',
      alpha_dash: () => 'Chỉ bao gồm chữ, số, gạch ngang và gạch dưới',
      alpha_num: () => 'Chỉ bao gồm chữ, số và không có ký tự đặc biệt',
      alpha_spaces: () => 'Chỉ bao gồm chữ và khoảng cách',
      between: () => 'Giá trị phải nằm trong khoảng 1-9',
      credit_card: () => 'Số thẻ không hợp lệ',
      date_between: () => 'Ngày được chọn phải nằm trong khoảng 1-9',
      date_format: () => 'Không đúng định dạng, định dạng ngày ...',
      decimal: () => 'Không đúng giá trị thập phân',
      digits: () => 'Không được quá X chữ số',
      dimensions: () => 'Hình ảnh không đúng kích thước, kích thước đúng XxX',
      max: (field, [length]) => `Độ dài tối đa ${length} ký tự`,
      max_value: (field, [length]) => `Giá trị tối đa: ${length}`,
      min: (field, [length]) => `Độ dài tối thiểu ${length} ký tự`,
      min_value: (field, [length]) => `Giá trị tối thiểu: ${length}`,
      numeric: () => 'Chỉ bao gồm số',
      regex: () => 'Regular expression không hợp lệ',
      size: () => 'File không được quá X kb',
      url: () => 'Đường dẫn không hợp lệ'
    }
  }
}

Vue.use(VeeValidate, config)
VeeValidate.Validator.localize('vn', dictionary.vn)
