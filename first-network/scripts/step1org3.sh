#!/bin/bash
#
# Copyright IBM Corp. All Rights Reserved.
#
# SPDX-License-Identifier: Apache-2.0
#

# This script is designed to be run in the ${ORG_NAME}cli container as the
# first step of the EYFN tutorial.  It creates and submits a
# configuration transaction to add ${ORG_NAME} to the network previously
# setup in the BYFN tutorial.
#
ORG_NAME="$6"
ORG_MSP="$6MSP"
CHANNEL_NAME="$1"
DELAY="$2"
LANGUAGE="$3"
TIMEOUT="$4"
VERBOSE="$5"
: ${CHANNEL_NAME:="mychannel"}
: ${DELAY:="3"}
: ${LANGUAGE:="node"}
: ${TIMEOUT:="10"}
: ${VERBOSE:="false"}
LANGUAGE=`echo "$LANGUAGE" | tr [:upper:] [:lower:]`
COUNTER=1
MAX_RETRY=5

CC_SRC_PATH="github.com/chaincode/medical/javascript/"
if [ "$LANGUAGE" = "node" ]; then
	CC_SRC_PATH="/opt/gopath/src/github.com/chaincode/medical/javascript/"
fi

# import utils
. scripts/utils.sh
echo ${ORG_MSP}
echo
echo "========= Creating config transaction to add ${ORG_NAME} to network =========== "
echo

echo "Installing jq"
apt-get -y update && apt-get -y install jq

# Fetch the config for the channel, writing it to config.json
fetchChannelConfig ${CHANNEL_NAME} config.json

# Modify the configuration to append the new org
set -x
jq -s '.[0] * {"channel_group":{"groups":{"Application":{"groups": {"'${ORG_MSP}'":.[1]}}}}}' config.json ./channel-artifacts/${ORG_NAME}.json > modified_config.json
set +x

# Compute a config update, based on the differences between config.json and modified_config.json, write it as a transaction to ${ORG_NAME}_update_in_envelope.pb
createConfigUpdate ${CHANNEL_NAME} config.json modified_config.json ${ORG_NAME}_update_in_envelope.pb


echo
echo "========= Config transaction to add ${ORG_NAME} to network created ===== "
echo

echo "Signing config transaction"
echo
signConfigtxAsPeerOrg 1 ${ORG_NAME}_update_in_envelope.pb

echo
echo "========= Submitting transaction from a different peer (peer0.org2) which also signs it ========= "
echo
setGlobals 0 2
set -x
peer channel update -f ${ORG_NAME}_update_in_envelope.pb -c ${CHANNEL_NAME} -o orderer.example.com:7050 --tls --cafile ${ORDERER_CA}
set +x

echo
echo "========= Config transaction to add ${ORG_NAME} to network submitted! =========== "
echo

exit 0
