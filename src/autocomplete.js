import { debounce } from './utils.js';

const autocomplete = ({
  root,
  debounceDuration,
  fetchData,
  renderOption,
  onOptionClick,
  inputVal,
}) => {
  root.innerHTML = renderAutocomplete();
  const input = root.querySelector('input');
  const optionsContainer = root.querySelector('#options');

  

  const onInput = async (event) => {
    const search = event.target.value;
    const items = await fetchData(search);
    optionsContainer.innerHTML = ``;
    if (!items || !items.length) {
      optionsContainer.classList.add('hidden');
      return;
    }

    for (const item of items) {
      const option = document.createElement('div');
      option.innerHTML = renderOption(item);
      optionsContainer.append(option);
      option.addEventListener('click', () => {
        optionsContainer.classList.add('hidden');
        input.value = inputVal(item);
        onOptionClick(item);
      });
    }
    optionsContainer.classList.remove('hidden');
  };

  input.addEventListener('input', debounce(onInput, debounceDuration));
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!root.contains(target)) {
      optionsContainer.classList.add('hidden');
    }
  });
};
const renderAutocomplete = () => {
  return `
      <div class="px-2">
        <div class="relative">
          <input id="m1" class="py-2 px-4 block w-full border-2 rounded border-gray-400" type="text" />
          <div
            id="options"
            class="mx-2 p-5 rounded-b-md border  absolute left-0 right-0 top-full translate-y-1 z-40 bg-white overflow-auto max-h-[600px] hidden"
          ></div>
        </div>
      </div>
  `;
};
export default autocomplete;
