const getTopLevelFilenames = input => {
  let isOpen = false;
  const topLevelCommas = [0];
  const topLevelNames = [];

  input.split('').forEach((element, index) => {
    if (element === '{') {
      isOpen = true;
    } else if (element === '}') {
      isOpen = false;
    }

    if (!isOpen && element === ',') {
      topLevelCommas.push(index);
    }
  });
  topLevelCommas.forEach((element, index) => {
    const filename = input.substring(element, topLevelCommas[index + 1]).replace(/(^,)|(,$)/g, '');
    topLevelNames.push(filename);
  });

  return topLevelNames;
};

const extract = (input, pattern) => {
  const match = input.match(pattern);
  if (match === null) {
    return [];
  }
  return match[0]
    .replace(' ', '')
    .replace('{', '')
    .replace('}', '')
    .replace('.', '')
    .split(',');
};

const getFileTypes = input => extract(input, /\.(.*)/);

const getGroupConditionsForNames = input => extract(input, /{.*}/);

const getNames = input => {
  const match = input.match(/.+?(?=\.)/);
  if (match !== null) {
    if (match[0].includes(`{`) && match[0].includes(`}`)) {
      return getGroupConditionsForNames(match[0]).map(x => match[0].replace(/{.*}/, x));
    }
    return [match[0]];
  }
  return [];
};

module.exports = input => {
  const filesToMake = [];

  const fileNames = getTopLevelFilenames(input);

  fileNames.forEach(element => {
    var names = getNames(element);
    var types = getFileTypes(element);
    names.forEach(name => {
      types.forEach(type => {
        filesToMake.push(`${name}.${type}`.replace(`{`, ``).replace(`}`, ``));
      });
    });
  });

  return filesToMake;
};
