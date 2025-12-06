import { Input } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, cssVar }) => {

  const radius = cssVar?.borderRadius || '24px';
  const lineWidth = cssVar?.lineWidth || '1px';

  return {
    focusEffect: css`
      border-width: ${lineWidth};
      border-radius: ${radius};
      transition: box-shadow 0.2s;

      &:hover {
        border: 1px solid #d9d9d9;
      }

      &:focus-visible {
        border-color: #6ea8fe;
        box-shadow: 0 0 0 4px rgba(110,168,254,0.4);
      }
    `,};
});

const stylesFnSearch = (info) => {
  if (info.props.size === 'large') {
    return {
      root: { color: '#4DA8DA' },
      input: { color: '#4DA8DA', borderColor: '#4DA8DA' },
      prefix: { color: '#4DA8DA' },
      suffix: { color: '#4DA8DA' },
      count: { color: '#4DA8DA' },
      button: {
        icon: { color: '#4DA8DA' },
      },
    };
  }
  return {};
};

const SearchInput = ({placeholder}) => {
  const { styles: classNames } = useStyles();
  return (
    <Input.Search
      classNames={classNames}
      styles={stylesFnSearch}
      size="large"
      placeholder={placeholder}
      name="search-input"
      allowClear
      className='pricelist-search-input'
    />
  );
};

export default SearchInput;
