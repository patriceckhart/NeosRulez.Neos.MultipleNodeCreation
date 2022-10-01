# A Neos CMS plugin that allows creating multiple nodes. As you know it from TYPO3.

NeosRulez.Neos.MultipleNodeCreation allows to create multiple nodes in the Neos backend page tree. 
With the possibility to choose the NodeType, create the pages disabled or create disabled in the menu. Like old times in TYPO3 😉.

![MultipleNodeCreation](https://raw.githubusercontent.com/patriceckhart/NeosRulez.Neos.MultipleNodeCreation/master/Preview.png)

## Installation

The NeosRulez.Neos.MultipleNodeCreation is listed on packagist (https://packagist.org/packages/neosrulez/neos-multiplenodecreation) - therefore you don't have to include the package in your "repositories" entry any more.

Just run ```composer require neosrulez/neos-multiplenodecreation```

## Settings.yaml

```yaml
NeosRulez:
  Neos:
    MultipleNodeCreation:
      site:
        minRows: 5 # The default number of expandable rows
```

## Author

* E-Mail: mail@patriceckhart.com
* URL: http://www.patriceckhart.com
