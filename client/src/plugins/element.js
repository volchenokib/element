import Vue from 'vue';
import {
	Button,
	Icon,
	Table,
	TableColumn,
	Col,
	Form,
	FormItem,
	Input,
	Select,
	Option,
	DatePicker,
	Checkbox,
	Radio,
	RadioGroup,
	Tooltip,
	Dialog,
	Popover
} from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

locale.use(lang);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(DatePicker);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Tooltip);
Vue.use(Dialog);
Vue.use(Popover);
