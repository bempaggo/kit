#!/bin/bash
sub_version=134
version="18.0.$sub_version"
sub_version_release=$((sub_version+1))
update="18.0.$sub_version_release"
echo $version
echo $update
cd bempaggo-kit
sed -i "s/$version/$update/g" package.json 
cd ..
cd bempaggo-kit-express
sed -i "s/$version/$update/g" package.json 
cd ..
cd bempaggo-kit-layers
sed -i "s/$version/$update/g" package.json 
cd ..
cd bempaggo-kit-test
sed -i "s/$version/$update/g" package.json 
cd ..
sed -i "s/=$sub_version/=$sub_version_release/g" update.sh 
